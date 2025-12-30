import fs from 'fs';

const initialStates = {
	mode: 'idle',
	phase: 'idle',
	catState: 'happy',
	lastState: '',
	background: 'day',
	currentOptions: [],
	correctOption: null,
	pickedOption: null,
	lastUpdated: '',
};

const initialStats = {
	successfulFeed: 0,
	successfulBath: 0,
	successfulPet: 0,
	unsuccessfulFeed: 0,
	unsuccessfulBath: 0,
	unsuccessfulPet: 0,
};

const initialLeaderboard = {
	top: [],
};

function resetStates(statesPath = 'states/states.json', statsPath = 'states/stats.json', leaderboardPath = 'states/leaderboard.json') {
	fs.writeFileSync(statesPath, JSON.stringify(initialStates, null, 2), 'utf8');
	fs.writeFileSync(statsPath, JSON.stringify(initialStats, null, 2), 'utf8');
	fs.writeFileSync(leaderboardPath, JSON.stringify(initialLeaderboard, null, 2), 'utf8');
}

resetStates();
