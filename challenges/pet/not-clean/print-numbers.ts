// REASON: This code is not-clean due to its confusing and unnatural control flow, using a `while(true)` loop with a `break` instead of a standard `for` loop.
export function printNumbers(max: number) {
	let i = 0;
	while (true) {
		if (i >= max) {
			break;
		}
		console.log(i);
		i++;
	}
}
