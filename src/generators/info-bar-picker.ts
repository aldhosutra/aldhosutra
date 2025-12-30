import fs from 'fs';
import { GameState } from '../types';
import { getReason } from '../util/challenges-loader.js';

const repo = process.env.REPO || 'REPO_OWNER/REPO_NAME';

export function pickInfoBar(stateFile = 'states/states.json', infoDialoguePath = 'constants/info-dialogue.json') {
	const raw = fs.readFileSync(stateFile, 'utf8');
	const state = JSON.parse(raw) as GameState;

	let infoDialogue = 'Meow.';

	try {
		const dlgText = fs.readFileSync(infoDialoguePath, 'utf8');
		const dlg = JSON.parse(dlgText);

		if (state.background === 'day') {
			const key = `${state.catState}${state.phase !== 'idle' ? `-${state.phase}` : ''}`;

			const arr = dlg[key];
			infoDialogue = Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : String(arr);

			if (['correct', 'incorrect'].includes(state.phase) && state.pickedOption !== null && state.pickedOption >= 0) {
				infoDialogue += `\n(Reason: ${getReason(state.currentOptions[state.pickedOption])})`;
			}

			if (state.phase !== 'idle' && state.phase !== 'choosing') {
				infoDialogue += `\n[[Back to Main Menu]](https://github.com/${repo}/issues/new?template=close.md)`;
			}

			if (state.phase === 'idle' && state.catState === 'happy') {
				infoDialogue += `\n[[Don't want to wait?]](https://github.com/${repo}/issues/new?template=force-update-mode.md)`;
			}
		} else {
			const arr = dlg['sleepy'];
			infoDialogue = Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : String(arr);
		}
	} catch (e) {
		// ignore
	}

	return infoDialogue;
}
