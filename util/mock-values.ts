export const america = {
	_id: '5efbfe09f97cf572e4d2cd4c',
	name: 'America (Teddy)',
	icon: 'https://vignette.wikia.nocookie.net/civilization/images/9/90/American_%28Civ6%29.png/',
	leader: {
		name: 'Teddy Roosevelt',
		portrait: 'https://vignette.wikia.nocookie.net/civilization/images/7/70/Teddy_Roosevelt_%28Civ6%29.png/',
		abilityName: 'Roosevelt Corollary',
		ability:
			'Units receive +5 [ICON_COMBAT_STRENGTH] Combat Strength on their home continent. +1 Appeal to all tiles in a city with a National Park. Gain the Rough Rider unique unit with Rifling.'
	},
	abilityName: 'Founding Fathers',
	ability:
		'All Diplomatic policy slots in the current government are converted to Wildcard policy slots. Gains +1 [ICON_DIPLOMATIC_FAVOR] Diplomatic Favor per turn for every Wildcard slot in their government.',
	units: [
		{
			name: 'P-51 Mustang',
			strength: 105,
			movement: 6,
			special: ['+5 [ICON_COMBAT_STRENGTH] Combat Strength vs. fighters, +50% experience gain'],
			replaces: 'Fighter'
		},
		{
			name: 'Rough Rider',
			strength: 67,
			movement: 5,
			special: [
				"Earns Culture from kills on its Capital's Continent",
				'Gains +10 [ICON_COMBAT_STRENGTH] Combat Strength when fighting on Hills',
				'No Strategic Resource requirement'
			],
			replaces: null
		}
	],
	building: {
		name: 'Film Studio',
		yield: {
			Culture: {
				default: 2,
				powered: 4
			}
		},
		district: 'Theater Square',
		special: [
			'+2 [ICON_CULTURE] Culture',
			'+4 [ICON_CULTURE] Culture when Powered',
			'Base load: 3 [ICON_POWER] Power',
			'+1 [ICON_GREATARTIST] Great Artist Point, +2 [ICON_GREATMUSICIAN] Great Musician Points',
			'+1 Great Work of Music Slot',
			'After Modern Era: +100% [ICON_TOURISM] Tourism pressure from this city towards other civilizations'
		],
		replaces: 'Broadcast Center'
	}
};

export const arabia = {
	_id: '5ed21d96b8b10018acb33359',
	name: 'Arabia (Saladin)',
	icon: 'https://vignette.wikia.nocookie.net/civilization/images/5/58/Arabian_%28Civ6%29.png/',
	leader: {
		name: 'Saladin',
		portrait: 'https://vignette.wikia.nocookie.net/civilization/images/5/57/Saladin_%28Civ6%29.png/',
		abilityName: 'Righteousness of the Faith',
		ability:
			"The Worship building for Arabia's Religion can be purchased at 10% of the usual [ICON_FAITH] Faith cost, and grants Arabian cities with it +10% [ICON_SCIENCE] Science, [ICON_FAITH] Faith, and [ICON_CULTURE] Culture."
	},
	abilityName: 'The Last Prophet',
	ability:
		"Automatically receives the final [ICON_GREATPROPHET] Great Prophet when the next-to-last one is claimed (if one has not been earned already). +1 [ICON_SCIENCE] Science per foreign city following Arabia's Religion.",
	units: [
		{
			name: 'Mamluk',
			strength: 48,
			movement: 4,
			special: ['Heals every turn'],
			replaces: 'Knight'
		}
	],
	building: {
		name: 'Madrasa',
		yield: {
			Science: {
				default: 2
			}
		},
		district: 'Campus',
		special: [
			'+5 [ICON_SCIENCE] Science',
			'+1 [ICON_GREATSCIENTIST] Great Scientist Point',
			'+1 [ICON_HOUSING] Housing',
			'Provides Faith Faith equal to the adjacency bonus of the [ICON_CAMPUS] Campus'
		],
		replaces: 'University'
	}
};
