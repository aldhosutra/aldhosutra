import { describe, it, expect } from 'vitest';
import { pickForAction } from '../src/util/challenges-loader.js';

describe('challenges-loader', () => {
	it('finds files for feed', async () => {
		const res = await pickForAction('feed');
		expect(res.files.length).toBeGreaterThanOrEqual(2);
	});
});
