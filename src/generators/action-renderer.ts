import fs from 'fs';
import { GameState } from '../types';

const repo = process.env.REPO || 'REPO_OWNER/REPO_NAME';

function getActionMode(state: GameState, catState: string) {
	if (state.catState === catState) return 'enabled';
	return 'disabled';
}

function getActionButton(state: GameState, catState: string, action: string) {
	const mode = getActionMode(state, catState);
	if (mode === 'enabled' && state.background === 'day') {
		return `[![${action.toUpperCase()} button](assets/action/${action}-enabled.png)](https://github.com/${repo}/issues/new?template=${action}.yml)`;
	}
	return `![${action.toUpperCase()} button](assets/action/${action}-disabled.png)`;
}

export function renderAction(statesPath = 'states/states.json') {
	const raw = fs.readFileSync(statesPath, 'utf8');
	const state = JSON.parse(raw) as GameState;

	if (state.phase !== 'idle') return ``;

	const actionMarkdown = `
${getActionButton(state, 'hungry', 'feed')}
${getActionButton(state, 'dirty', 'bath')}
${getActionButton(state, 'bored', 'pet')}

    `;

	return actionMarkdown;
}
