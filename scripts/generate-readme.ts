#!/usr/bin/env node
import fs from 'fs';
import { pickInfoBar } from '../src/generators/info-bar-picker.js';
import { renderAction } from '../src/generators/action-renderer.js';
import { renderOptions } from '../src/generators/option-renderer.js';
import { renderLeaderboard } from '../src/generators/leaderboard-renderer.js';
import { renderStats } from '../src/generators/stats-renderer.js';
import { GameState } from '../src/types.js';

function generate(statesPath = 'states/states.json', statsPath = 'states/stats.json', leaderboardPath = 'states/leaderboard.json') {
	const contents = fs.existsSync('README_CONTENTS.md') ? fs.readFileSync('README_CONTENTS.md', 'utf8') : '';
	const states: GameState = JSON.parse(fs.readFileSync(statesPath, 'utf8'));

	const readme = `
<!-- GENERATED: do not edit; run npm run generate-readme -->

${contents}
![Main Screen](assets/mainscreen-${states.lastGenerated}.png)

> ${pickInfoBar(statesPath)}

${renderAction(statesPath)}
${renderOptions(statesPath)}
<details>
<summary>🏆 Leaderboard & Stats</summary>
${renderStats(statsPath)}

${renderLeaderboard(leaderboardPath)}
</details>
<!-- EASTER_EGG: Ahhh you found me! By the way, only between us, I love playing silksong! -->
`;

	fs.writeFileSync('README.md', readme, 'utf8');
}

generate();
