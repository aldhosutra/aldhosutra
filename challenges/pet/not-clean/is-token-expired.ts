// REASON: This code is not-clean because it uses a "magic number" (86400). It's not obvious what this number represents without context (it's seconds in a day).
export function isTokenExpired(tokenCreationTime: number) {
	const now = Date.now() / 1000;
	if (now - tokenCreationTime > 86400) {
		return true;
	}
	return false;
}
