// REASON: This function promises to return a number but can return a string 'Not found' if the user does not exist, which violates the TypeScript type signature.
export function findUserId(users: { id: number; name: string }[], name: string): number {
	const user = users.find(u => u.name === name);
	if (!user) {
		return 'Not found';
	}
	return user.id;
}
