// REASON: This function correctly generates a list of personalized greetings from an array of names.
export function generateGreetings(names: string[]) {
	return names.map(name => `Hello, ${name}!`);
}
