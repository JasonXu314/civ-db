type Yield = 'Food' | 'Production' | 'Gold' | 'Science' | 'Faith' | 'Culture';
type YieldIconType = 'food' | 'production' | 'gold' | 'science' | 'faith' | 'culture';
type StrategicResource = 'Horses' | 'Iron' | 'Niter' | 'Coal' | 'Oil' | 'Aluminum' | 'Uranium';
type ResourceIconType = 'horses' | 'iron' | 'niter' | 'coal' | 'oil' | 'aluminum';
type Era =
	| 'Ancient Era'
	| 'Classical Era'
	| 'Medieval Era'
	| 'Renaissance Era'
	| 'Industrial Era'
	| 'Modern Era'
	| 'Atomic Era'
	| 'Information Era'
	| 'Future Era';
type UnitClass =
	| 'Recon'
	| 'Melee'
	| 'Anti-Cavalry'
	| 'Ranged'
	| 'Siege'
	| 'Light Cavalry'
	| 'Heavy Cavalry'
	| 'Naval Melee'
	| 'Naval Ranged'
	| 'Naval Raider'
	| 'Naval Carrier'
	| 'Air Fighter'
	| 'Air Bomber'
	| 'GDR';
type ViewMode = 'table' | 'list';

interface Leader {
	_id: string;
	name: string;
	portrait: string;
	abilityName: string;
	ability: string;
}

interface Unit {
	_id: string;
	name: string;
	strength: number;
	rangedStrength: number | null;
	movement: number;
	range: number;
	bombardStrength: number | null;
	era: Era;
	unitClass: UnitClass;
	productionCost: number;
	purchaseCost: number;
	maintainanceCost: number;
	productionResourceCost: {
		type: ResourceIconType;
		cost: number;
	} | null;
	maintainanceResourceCost: {
		type: ResourceIconType;
		cost: number;
	} | null;
	media: {
		portrait: string;
		icon: string;
	};
}

interface UniqueUnit extends Unit {
	special: string[];
	replaces: string | null;
}

interface District {
	id: string;
	name: string;
	yield: Yield;
	buildings: Building[];
	special: string[];
}

interface UniqueDistrict extends District {
	replaces: string;
}

interface Building {
	id: string;
	name: string;
	yield: Partial<Record<Yield, { default: number; powered?: number }>>;
	district: string;
}

interface UniqueBuilding extends Building {
	replaces: string | null;
	special: string[];
}

interface Improvement {
	id: string;
	name: string;
	yields: Record<Yield, number>;
	restrictions: string[];
}

interface UniqueImprovement extends Improvement {
	special: string[];
}

interface Civ {
	_id: string;
	name: string;
	icon: string;
	leader: Leader;
	abilityName: string;
	ability: string;
	units: string[];
	building?: UniqueBuilding;
	district?: UniqueDistrict;
	improvement?: UniqueImprovement;
}
