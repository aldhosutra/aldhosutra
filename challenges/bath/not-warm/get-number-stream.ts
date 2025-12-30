// REASON: This code is not-warm. It creates a data stream that is not yet flowing; the consumer must wait for the 'data' events to get the values.
export function getNumberStream() {
	const EventEmitter = require('events');
	class NumberStream extends EventEmitter {
		constructor() {
			super();
			let count = 0;
			setInterval(() => {
				this.emit('data', count++);
			}, 1000);
		}
	}
	return new NumberStream();
}
