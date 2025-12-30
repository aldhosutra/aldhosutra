// REASON: This code is not-clean because it uses an unnecessarily verbose if-else block to return a boolean value, instead of returning the comparison directly.
export function validate(value: number) {
	if (value > 10) {
		return true;
	} else {
		return false;
	}
}
