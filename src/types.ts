export type GameState = {
	mode: string;
	phase: string;
	catState: string;
	lastState: string;
	background: string;
	currentOptions: string[];
	correctOption: number | null;
	pickedOption: number | null;
	lastUpdated: string;
	lastGenerated: number;
};

export type GithubEvent = {
	issue: {
		number: number;
		title: string;
		body: string;
		user: {
			login: string;
			id: number;
			html_url: string;
		};
	};
};

export type Leaderboard = {
	top: {
		user: string;
		score: number;
		url: string;
	}[];
};

export type GameStats = {
	successfulFeed: number;
	successfulBath: number;
	successfulPet: number;
	unsuccessfulFeed: number;
	unsuccessfulBath: number;
	unsuccessfulPet: number;
};

export type PickResult = {
	files: string[];
	correctIndex: number;
};
