import { ObjectId } from 'mongodb';

export type Yield = 'Food' | 'Production' | 'Gold' | 'Science' | 'Faith' | 'Culture';
export type WithId<T> = T & { _id: string };
export type WithObjectId<T> = T & { _id: ObjectId };

export interface User {
	id: number;
	name: string;
}

export interface Leader {
	name: string;
	portrait: string;
	abilityName: string;
	ability: string;
}

export interface Unit {
	name: string;
	strength: number;
	movement: number;
}

export interface UniqueUnit extends Unit {
	special: string[];
	replaces: string | null;
}

export interface District {
	name: string;
	yield: Yield;
	buildings: Building[];
	special: string[];
}

export interface UniqueDistrict extends District {
	replaces: string;
}

export interface Building {
	name: string;
	yield: Partial<Record<Yield, { default: number; powered?: number }>>;
	district: string;
}

export interface UniqueBuilding extends Building {
	replaces: string | null;
	special: string[];
}

export interface Improvement {
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
}
