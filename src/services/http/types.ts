export interface Card {
	id: string;
	name: string;
	supertype: string;
	subtypes: string[];
	hp?: string;
	types?: string[];
	evolesFrom?: string;
	evolvesTo?: string[];
	rules?: string[];
	abilities?: IAbility[];
	attacks?: IAttack[];
	weaknesses?: IWeakness[];
	resistances?: IResistance[];
	retreatCost?: string[];
	convertedRetreatCost?: number;
	number: string;
	artist?: string;
	rarity: string;
	flavorText?: string;
	nationalPokedexNumbers?: number[];
	images: { large: string; small: string };
}

interface IAbility {
	name: string;
	text: string;
	type: string;
}

export interface IAttack {
	cost: string[];
	name: string;
	text: string;
	damage: string;
	convertedEnergyCost: string;
}

interface IResistance {
	type: string;
	value: string;
}

interface IWeakness {
	type: string;
	value: string;
}
