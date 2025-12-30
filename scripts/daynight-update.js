import fs from 'fs';
import { execSync } from 'child_process';

const tz = process.env.AUTHOR_TIMEZONE || 'Asia/Jakarta';

function isNight(d = new Date(), tz) {
	const parts = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		hour12: false,
		timeZone: tz,
	}).formatToParts(d);

	const hourPart = parts.find(p => p.type === 'hour');
	const hour = hourPart ? parseInt(hourPart.value, 10) : d.getUTCHours();

	return hour < 6 || hour >= 18;
}

function isCorrectBackground(background, d = new Date(), tz) {
	const night = isNight(d, tz);
	if (night) {
		return background.toLowerCase().includes('night');
	} else {
		return background.toLowerCase().includes('day');
	}
}

function update(statesPath = 'states/states.json') {
	if (!fs.existsSync(statesPath)) process.exit(0);

	const s = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
	const night = isNight(new Date(), tz);

	if (isCorrectBackground(s.background, new Date(), tz)) return;

	s.background = night ? 'night' : 'day';
	s.lastUpdated = new Date().toISOString();

	fs.writeFileSync(statesPath, JSON.stringify(s, null, 2), 'utf8');

	try {
		if (!fs.existsSync('node_modules')) execSync('npm install', { stdio: 'inherit' });
		execSync('node --loader ts-node/esm scripts/generate-assets.ts', { stdio: 'inherit' });
		execSync('node --loader ts-node/esm scripts/generate-readme.ts', { stdio: 'inherit' });
	} catch (e) {
		console.error(e);
	}
}

update();
