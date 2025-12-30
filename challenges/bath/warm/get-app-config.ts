// REASON: This function is warm because it returns a hardcoded configuration object that is immediately available in memory without any delay or setup.
export function getAppConfig() {
	const config = {
		appName: 'Cat Feeder 5000',
		version: '1.0.0',
		featureFlags: {
			enablePetting: true,
			enableLaser: false,
		},
	};
	return config;
}
