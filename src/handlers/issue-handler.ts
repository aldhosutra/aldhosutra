#!/usr/bin/env node
import fs from 'fs';
import child from 'child_process';
import { pickForAction } from '../util/challenges-loader.js';
import { GameState, GameStats, GithubEvent } from '../types.js';
import { increaseLeaderboardScore } from '../util/leaderboard.js';
import { isCorrectBackground } from '../util/time.js';

const repo = process.env.REPO;
const token = process.env.GITHUB_TOKEN;

async function closeIssue(issueNumber: number) {
	if (token && repo) {
		const response = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				Accept: 'application/vnd.github+json',
			},
			body: JSON.stringify({
				state: 'closed',
			}),
		});

		if (!response.ok) {
			const text = await response.text();
			throw new Error(JSON.stringify({ issueNumber, on: 'close', status: response.status, text }));
		}
	}
}

async function commentOnIssue(issueNumber: number, body: string) {
	if (token && repo) {
		const response = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				Accept: 'application/vnd.github+json',
			},
			body: JSON.stringify({ body }),
		});

		if (!response.ok) {
			const text = await response.text();
			throw new Error(JSON.stringify({ issueNumber, on: 'comment', status: response.status, text }));
		}
	}
}

async function postIssueHandling(issueNumber: number, message: string) {
	try {
		await commentOnIssue(issueNumber, message);
	} catch (e) {
		console.warn('Failed to comment, proceeding to close', e);
	}
	await closeIssue(issueNumber);
}

function generateAssetsAndReadme() {
	try {
		child.execSync('node --loader ts-node/esm scripts/generate-assets.ts', { stdio: 'inherit' });
		child.execSync('node --loader ts-node/esm scripts/generate-readme.ts', { stdio: 'inherit' });
	} catch (e) {
		// ignore
	}
}

function readEvent(eventPath: string): GithubEvent {
	return JSON.parse(fs.readFileSync(eventPath, 'utf8'));
}

function extractAction(issue: GithubEvent['issue']) {
	if (!issue) return null;
	const body = issue.body || '';
	const m = body.match(/<!--\s*action:\s*(.*?)\s*-->/i);
	if (m) return m[1].trim();
	if (issue.title) return issue.title.toLowerCase().split(' ')[0];
	return null;
}

async function handleOpen(eventPath: string, statesPath = 'states/states.json', statsPath = 'states/stats.json', leaderboardPath = 'states/leaderboard.json') {
	const evt = readEvent(eventPath);
	const issue = evt.issue || evt;
	const issueNumber = issue.number;
	const action = extractAction(issue);

	if (!action) {
		await postIssueHandling(issueNumber, 'Nothing happened — I couldn’t find an action in this issue.');
		return;
	}

	const states: GameState = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
	const stats: GameStats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

	if (action === 'force-update-daynight') {
		if (isCorrectBackground(states.background)) {
			await postIssueHandling(issueNumber, 'Everything looks good — the background is already up to date.');
			return;
		}

		try {
			child.execSync('node scripts/daynight-update.js', { stdio: 'inherit' });
		} catch (e) {
			// ignore
		}

		await postIssueHandling(issueNumber, 'Background updated successfully. Day and night are now in sync.');
		return;
	}

	if (states.background !== 'day') {
		await postIssueHandling(issueNumber, 'I can’t do that right now — actions are only available during the day.');
		return;
	}

	if (action === 'force-update-mode') {
		if (states.catState !== 'happy') {
			await postIssueHandling(issueNumber, 'No update needed — a challenge is already available.');
			return;
		}

		try {
			child.execSync('node scripts/mode-update.js', { stdio: 'inherit' });
		} catch (e) {
			// ignore
		}

		await postIssueHandling(issueNumber, 'A new challenge has been unlocked.');
		return;
	}

	if (['feed', 'bath', 'pet'].includes(action)) {
		if (states.phase !== 'idle') {
			await postIssueHandling(issueNumber, 'Cannot start new action, not in idle phase');
			return;
		}

		if (action === 'feed' && states.catState !== 'hungry') {
			await postIssueHandling(issueNumber, 'The cat isn’t hungry right now, so feeding isn’t needed.');
			return;
		}

		if (action === 'bath' && states.catState !== 'dirty') {
			await postIssueHandling(issueNumber, 'The cat is already clean, no bath needed.');
			return;
		}

		if (action === 'pet' && states.catState !== 'bored') {
			await postIssueHandling(issueNumber, 'The cat isn’t bored right now and doesn’t need attention.');
			return;
		}

		// validate - for simplicity allow always
		states.mode = action;
		states.phase = 'choosing';
		states.lastState = states.catState;
		states.lastUpdated = new Date().toISOString();

		// pick challenges
		const pick = await pickForAction(action);
		states.currentOptions = pick.files;
		states.correctOption = pick.correctIndex;
		states.pickedOption = null;

		fs.writeFileSync(statesPath, JSON.stringify(states, null, 2), 'utf8');

		generateAssetsAndReadme();

		await postIssueHandling(issueNumber, 'A new challenge is ready. Make your choice!');
		return;
	}

	const pickMatch = action.match(/^pick-option-(\d)$/);
	if (pickMatch) {
		const n = parseInt(pickMatch[1], 10) - 1;

		if (states.phase !== 'choosing') {
			await postIssueHandling(issueNumber, 'There’s nothing to pick right now.');
			return;
		}

		if (n === states.correctOption) {
			// success
			if (states.mode === 'feed') stats.successfulFeed++;
			if (states.mode === 'bath') stats.successfulBath++;
			if (states.mode === 'pet') stats.successfulPet++;
			states.phase = 'correct';
			states.lastState = 'happy';
			increaseLeaderboardScore(leaderboardPath, evt.issue.user.login, evt.issue.user.html_url, 1);
		} else {
			// incorrect
			if (states.mode === 'feed') stats.unsuccessfulFeed++;
			if (states.mode === 'bath') stats.unsuccessfulBath++;
			if (states.mode === 'pet') stats.unsuccessfulPet++;
			states.phase = 'incorrect';
		}

		states.lastUpdated = new Date().toISOString();
		states.pickedOption = n;

		fs.writeFileSync(statesPath, JSON.stringify(states, null, 2), 'utf8');
		fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf8');

		generateAssetsAndReadme();

		await postIssueHandling(issueNumber, 'Your choice has been recorded.');
		return;
	}

	if (action === 'close') {
		if (states.mode === 'idle') {
			await postIssueHandling(issueNumber, 'Everything is already calm and idle.');
			return;
		}

		if (states.phase === 'choosing') {
			await postIssueHandling(issueNumber, 'Cannot close while choosing an option');
			return;
		}

		states.mode = 'idle';
		states.phase = 'idle';
		states.catState = states.lastState;
		states.lastState = '';
		states.currentOptions = [];
		states.correctOption = null;
		states.pickedOption = null;
		states.lastUpdated = new Date().toISOString();

		fs.writeFileSync(statesPath, JSON.stringify(states, null, 2), 'utf8');

		generateAssetsAndReadme();

		await postIssueHandling(issueNumber, 'All done! Back to idle mode.');
		return;
	}

	await postIssueHandling(issueNumber, `I didn’t recognize this action: "${action}".`);
}

if (process.argv[2]) {
	handleOpen(process.argv[2]).catch(err => {
		console.error(err);
		process.exit(1);
	});
}
