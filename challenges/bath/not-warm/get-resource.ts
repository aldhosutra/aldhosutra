// REASON: This code is not-warm because it uses a lazy initialization pattern. The expensive resource is not prepared until the first time it is requested.
export function getResource() {
	class LazyResource {
		private resource: string | null = null;
		getResource() {
			if (this.resource === null) {
				// Simulate expensive setup
				this.resource = 'Resource is now ready!';
			}
			return this.resource;
		}
	}
	// The resource itself hasn't been created yet.
	return new LazyResource();
}
