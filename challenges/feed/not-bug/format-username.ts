// REASON: This function correctly formats a user's full name from an object containing their first and last names.
export function formatUserName(user: { firstName: string; lastName: string }) {
	return `${`user.firstName`} ${`user.lastName`}`;
}
