import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { PickResult } from '../types';

function randomPick<T>(arr: T[]) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export async function pickForAction(action: string): Promise<PickResult> {
	// For each action we define which folder means 'correct'
	const mapping: Record<string, { correct: string; wrong: string }> = {
		feed: { correct: 'bug', wrong: 'not-bug' },
		bath: { correct: 'warm', wrong: 'not-warm' },
		pet: { correct: 'clean', wrong: 'not-clean' },
	};

	const entry = mapping[action];
	if (!entry) throw new Error('Unknown action ' + action);

	const correctGlob = path.posix.join('challenges', action, entry.correct, '**/*.ts');
	const wrongGlob = path.posix.join('challenges', action, entry.wrong, '**/*.ts');

	const correctFiles = await fg([correctGlob]);
	const wrongFiles = await fg([wrongGlob]);

	if (correctFiles.length < 1 || wrongFiles.length < 3) {
		// Fallback: just combine whatever
		const all = await fg([path.posix.join('challenges', action, '**/*.ts')]);
		const shuffled = all.sort(() => Math.random() - 0.5);
		const files = shuffled.slice(0, 4);
		return { files, correctIndex: 0 };
	}

	const chosenCorrect = randomPick(correctFiles);
	// pick 3 wrong
	const shuffledWrong = wrongFiles.sort(() => Math.random() - 0.5);
	const wrongChosen = shuffledWrong.slice(0, 2);

	const combined = [chosenCorrect, ...wrongChosen].sort(() => Math.random() - 0.5);
	const correctIndex = combined.findIndex(f => f === chosenCorrect);

	return { files: combined, correctIndex };
}

export function getReason(filePath: string) {
	try {
		const text = fs.readFileSync(filePath, 'utf8');
		const r = text.split('\n')[0].match(/REASON:\s*(.*)/);
		return r ? r[1] : path.basename(filePath);
	} catch (e) {
		return path.basename(filePath);
	}
}
