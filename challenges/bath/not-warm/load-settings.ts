// REASON: This code is not-warm because it defines an async operation to fetch settings but does not wait for it to complete before returning.
export function loadSettings() {
	const settings = { theme: 'dark' };
	async function fetchRemoteSettings() {
		await new Promise(r => setTimeout(r, 500));
		settings.theme = 'light';
	}
	fetchRemoteSettings();
	return settings;
}
