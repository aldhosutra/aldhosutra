// REASON: This code is clean. It uses descriptive constants instead of "magic numbers," which makes the logic self-documenting and easier to understand.
export function getWaterState(temperatureInCelsius: number): string {
	const FREEZING_POINT = 0;
	const BOILING_POINT = 100;

	if (temperatureInCelsius <= FREEZING_POINT) {
		return 'Solid';
	}
	if (temperatureInCelsius >= BOILING_POINT) {
		return 'Gas';
	}
	return 'Liquid';
}
