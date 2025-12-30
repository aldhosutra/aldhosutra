// REASON: This code is not-clean. The function `handleItems` does too much; it finds, formats, and prints the data, mixing different levels of abstraction.
export function handleItems(items: string[]) {
	let found = false;
	let finalResult = '';
	for (let i = 0; i < items.length; i++) {
		if (items[i] === 'target') {
			found = true;
			finalResult = `FOUND: ${items[i]}`;
		}
	}
	if (found) {
		console.log(finalResult.toUpperCase());
	}
}
