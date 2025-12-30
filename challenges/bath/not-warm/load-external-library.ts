// REASON: This function is not-warm because it needs to dynamically load a script from a URL, which takes time and may fail.
export function loadExternalLibrary() {
	const library = { loaded: false, data: null };
	const url = 'https://example.com/library.js';
	// Simulates loading a script, which is an async process.
	console.log(`Loading library from ${url}...`);
	return library;
}
