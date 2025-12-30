// REASON: This function correctly filters an array of user objects to return only the users who are marked as active.
export function getActiveUsers(users: { name: string; active: boolean }[]) {
	return users.filter(user => user.active);
}
