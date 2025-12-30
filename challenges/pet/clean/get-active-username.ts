// REASON: This code is clean. It uses a standard array method and a clearly named helper function (`isActive`) to express its purpose without complex logic.
export function getActiveUserNames(users: { name: string; active: boolean }[]): string[] {
	const isActive = user => user.active;
	const toName = user => user.name;

	return users.filter(isActive).map(toName);
}
