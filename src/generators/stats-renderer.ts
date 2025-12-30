import fs from 'fs';
import { GameStats } from '../types';

export function renderStats(statsPath: string) {
	const raw = fs.readFileSync(statsPath, 'utf8');
	const stats = JSON.parse(raw) as GameStats;

	return `
![Successful Feeds](https://img.shields.io/badge/successful_feed-${stats.successfulFeed}-orange?style=for-the-badge)
![Successful Baths](https://img.shields.io/badge/successful_bath-${stats.successfulBath}-blue?style=for-the-badge)
![Successful Pets](https://img.shields.io/badge/successful_pet-${stats.successfulPet}-green?style=for-the-badge)
    `;
}
