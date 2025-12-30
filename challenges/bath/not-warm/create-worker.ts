// REASON: This code is not-warm because the worker has been created but has not received any tasks or instructions yet, so it is idle.
export function createWorker() {
	class BackgroundWorker {
		status = 'idle';
		startWork() {
			this.status = 'working';
			// Does work...
		}
	}
	// The worker exists but isn't doing anything useful yet.
	return new BackgroundWorker();
}
