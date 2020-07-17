import { classes, eras } from './constants';

export function createUnitsTable(units: Unit[]): Record<Class, (Unit | null)[]> {
	const out = Object.fromEntries<(Unit | null)[]>(classes.map((unitClass) => [unitClass, []])) as Record<Class, (Unit | null)[]>;

	for (const unitClass of classes) {
		for (const era of eras) {
			out[unitClass].push(units.find((unit) => unit.era === era && unit.unitClass === unitClass) || null);
		}
	}

	return out;
}
