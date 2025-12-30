import fs from 'fs';
import { GameState } from '../types';

const repo = process.env.REPO || 'REPO_OWNER/REPO_NAME';
const codeBlock = '```';

function getChallengesContent(filePath: string) {
	const content = fs.readFileSync(filePath, 'utf8');
	const lines = content.split(/\r?\n/);
	return lines.slice(1, lines.length - 1).join('\n');
}

export function renderOptions(statesPath = 'states/states.json') {
	const raw = fs.readFileSync(statesPath, 'utf8');
	const state = JSON.parse(raw) as GameState;

	if (state.phase === 'choosing') {
		let optionsMarkdown = '';

		for (let i = 0; i < state.currentOptions.length; i++) {
			const option = state.currentOptions[i];
			const content = getChallengesContent(option);
			optionsMarkdown += `
### Option ${i + 1}

${codeBlock}typescript
${content}
${codeBlock}
[![Pick This Button](assets/action//pick.png)](https://github.com/${repo}/issues/new?template=pick-option-${i + 1}.md)

`;
		}

		return optionsMarkdown;
	}

	if (['correct', 'incorrect'].includes(state.phase) && state.pickedOption !== null) {
		const option = state.currentOptions[state.pickedOption];
		const content = getChallengesContent(option);

		return `
### Picked Option

${codeBlock}typescript
${content}
${codeBlock}

`;
	}

	return '';
}
