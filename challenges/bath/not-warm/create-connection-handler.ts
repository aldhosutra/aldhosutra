// REASON: This function is not-warm because it returns a function that closes over a connection variable that has not been initialized.
export function createConnectionHandler() {
	let connection: any = null; // not initialized
	function send(data: string) {
		if (!connection) {
			throw new Error('No connection available.');
		}
		connection.send(data);
	}
	// The returned function is not ready to be used.
	return send;
}
