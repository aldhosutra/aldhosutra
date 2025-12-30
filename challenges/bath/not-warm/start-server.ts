// REASON: This function is not-warm because its configuration is incomplete. The setup function must be called to provide the required port.
export function startServer() {
	let config = { port: null };

	function setup(port: number) {
		config.port = port;
	}

	if (!config.port) {
		return 'Server cannot start without a port.';
	}
	return `Server starting on port ${`config.port`}`;
}
