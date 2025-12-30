import { describe, it, expect } from 'vitest';
import { isNight } from '../src/util/time.js';

describe('isNight', () => {
	it('returns boolean for Jakarta timezone', () => {
		const res = isNight('2025-01-01T03:00:00Z', 'Asia/Jakarta');
		expect(typeof res).toBe('boolean');
	});
});
