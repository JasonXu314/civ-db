export type Yield = 'Food' | 'Production' | 'Gold' | 'Science' | 'Faith' | 'Culture';

export interface Leader {
	id: string;
	name: string;
	portrait: string;
	abilityName: string;
	ability: string;
}

export interface Unit {
	id: string;
	name: string;
	strength: number;
	movement: number;
}

export interface UniqueUnit extends Unit {
	special: string[];
	replaces: string | null;
}

export interface District {
	id: string;
	name: string;
	yield: Yield;
	buildings: Building[];
	special: string[];
}

export interface UniqueDistrict extends District {
	replaces: string;
}

export interface Building {
	id: string;
	name: string;
	yield: Partial<Record<Yield, { default: number; powered?: number }>>;
	district: string;
}

export interface UniqueBuilding extends Building {
	replaces: string | null;
	special: string[];
}

export interface Improvement {
	id: string;
	name: string;
	yields: Record<Yield, number>;
	restrictions: string[];
}

export interface UniqueImprovement extends Improvement {
	special: string[];
}

export interface Civ {
	name: string;
	icon: string;
	leader: Leader;
	abilityName: string;
	ability: string;
	units: UniqueUnit[];
	building?: UniqueBuilding;
	district?: UniqueDistrict;
	improvement?: UniqueImprovement;
	id: string;
}
