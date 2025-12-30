// REASON: This code is not-warm because the database connection is null. It needs to be initialized before any database operations can be performed.
export function getCatFromDatabase() {
	let dbConnection = null;
	if (!dbConnection) {
		throw new Error('Database not connected. Please connect first.');
	}
	return { name: 'Sylvester' };
}
