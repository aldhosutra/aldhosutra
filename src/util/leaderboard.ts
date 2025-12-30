import fs from 'fs';
import { Leaderboard } from '../types';

export function increaseLeaderboardScore(leaderboardPath: string, user: string, url: string, increment = 1) {
	const leaderboard: Leaderboard = JSON.parse(fs.readFileSync(leaderboardPath, 'utf8'));

	const userEntry = leaderboard.top.find(entry => entry.user === user);
	if (userEntry) {
		userEntry.score += increment;
	} else {
		leaderboard.top.push({ user, url, score: increment });
	}

	// Sort leaderboard by score descending
	leaderboard.top.sort((a, b) => b.score - a.score);

	fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2), 'utf8');
}

export function decreaseLeaderboardScore(leaderboardPath: string, user: string, url: string, decrement = 1) {
	const leaderboard: Leaderboard = JSON.parse(fs.readFileSync(leaderboardPath, 'utf8'));

	const userEntry = leaderboard.top.find(entry => entry.user === user);
	if (userEntry) {
		userEntry.score -= decrement;
	} else {
		leaderboard.top.push({ user, url, score: decrement * -1 });
	}

	// Sort leaderboard by score descending
	leaderboard.top.sort((a, b) => b.score - a.score);

	fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2), 'utf8');
}
