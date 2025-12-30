// REASON: This code is not-clean. The function name `check` is too vague, and the excessive use of a chained ternary operator makes the logic hard to read.
export function check(data: number) {
	return data > 100 ? 'big' : data > 50 ? 'medium' : data > 0 ? 'small' : 'invalid';
}
