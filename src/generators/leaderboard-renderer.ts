import fs from 'fs';
import { Leaderboard } from '../types';

export function renderLeaderboard(leaderboardPath: string) {
	const raw = fs.readFileSync(leaderboardPath, 'utf8');
	const leaderboard = JSON.parse(raw) as Leaderboard;

	const top5 = leaderboard.top.slice(0, 5);
	let leaderboardContent = '';
	leaderboardContent += '| Rank | User | Score |\n';
	leaderboardContent += '| ---- | ---- | ----- |\n';

	for (let i = 0; i < top5.length; i++) {
		const user = top5[i];
		leaderboardContent += `| ${i + 1} | [${user.user}](${user.url}) | ${user.score} |\n`;
	}

	return leaderboardContent;
}
