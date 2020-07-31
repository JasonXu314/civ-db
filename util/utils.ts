import { eras, unitClasses } from './constants';

export function createUnitsTable(units: Unit[]): Record<UnitClass, (Unit | null)[]> {
	const out = Object.fromEntries<(Unit | null)[]>(unitClasses.map((unitClass) => [unitClass, []])) as Record<UnitClass, (Unit | null)[]>;

	for (const unitClass of unitClasses) {
		for (const era of eras) {
			out[unitClass].push(units.find((unit) => unit.era === era && unit.unitClass === unitClass) || null);
		}
	}

	return out;
}

export function capitalize(str: string): string {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function capitalizeAll(str: string): string {
	return str.split(' ').map(capitalize).join(' ');
}

export function roughlyEqual(str1: string, str2: string): boolean {
	return (
		str1.trim() !== '' &&
		str2.trim() !== '' &&
		(str1 === str2 || str1.toLowerCase().includes(str2.toLowerCase()) || str2.toLowerCase().includes(str1.toLowerCase()))
	);
}
