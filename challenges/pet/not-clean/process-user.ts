// REASON: This code is not-clean due to deeply nested if-statements, also known as the "arrow anti-pattern," which makes the logic difficult to follow.
export function processUser(user: any) {
	if (user) {
		if (user.isLoggedIn) {
			if (user.hasPermissions) {
				if (user.isActive) {
					return 'User processed.';
				}
			}
		}
	}
	return 'Cannot process user.';
}
