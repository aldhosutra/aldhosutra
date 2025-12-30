import fs from 'fs';
import { execSync } from 'child_process';

function executeGenerate() {
	try {
		execSync('node --loader ts-node/esm scripts/generate-assets.ts', { stdio: 'inherit' });
		execSync('node --loader ts-node/esm scripts/generate-readme.ts', { stdio: 'inherit' });
	} catch (e) {
		console.error(e);
	}
}

function update(statesPath = 'states/states.json') {
	if (!fs.existsSync(statesPath)) process.exit(0);

	const s = JSON.parse(fs.readFileSync(statesPath, 'utf8'));

	if (s.catState === 'happy' || ['correct', 'incorrect'].includes(s.phase)) {
		const stateOption = ['dirty', 'bored', 'hungry'];
		const randomIndex = Math.floor(Math.random() * stateOption.length);

		s.catState = stateOption[randomIndex];
		s.lastUpdated = new Date().toISOString();

		if (['correct', 'incorrect'].includes(s.phase)) {
			s.phase = 'idle';
			s.currentOptions = [];
			s.correctOption = null;
			s.pickedOption = null;
		}

		fs.writeFileSync(statesPath, JSON.stringify(s, null, 2), 'utf8');

		executeGenerate();
	}
}

update();
