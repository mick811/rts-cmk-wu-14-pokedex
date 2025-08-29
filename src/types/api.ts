export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_abilities?: PastAbility[];
    past_types?: PastType[];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface Ability {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export interface Form {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}

export interface HeldItem {
    item: NamedAPIResource;
    version_details: VersionDetail[];
}

export interface VersionDetail {
    rarity: number;
    version: NamedAPIResource;
}

export interface Move {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    order: number | null;
    version_group: NamedAPIResource;
}

export interface PastAbility {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
    generation: NamedAPIResource;
}

export interface PastType {
    generation: NamedAPIResource;
    types: Type[];
}

export interface Species {
    name: string;
    url: string;
}

export interface Sprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string | null;
            front_female: string | null;
        };
        home: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        "official-artwork": {
            front_default: string | null;
            front_shiny: string | null;
        };
        showdown: {
            back_default: string | null;
            back_female: string | null;
            back_shiny: string | null;
            back_shiny_female: string | null;
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
    };
    versions: SpriteVersions;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export interface Type {
    slot: number;
    type: NamedAPIResource;
}

export interface SpriteVersions {
    "generation-i": {
        "red-blue": GenerationSprites;
        yellow: GenerationSprites;
    };
    "generation-ii": {
        crystal: GenerationSprites;
        gold: GenerationSprites;
        silver: GenerationSprites;
    };
    "generation-iii": {
        emerald: GenerationSprites;
        "firered-leafgreen": GenerationSprites;
        "ruby-sapphire": GenerationSprites;
    };
    "generation-iv": {
        "diamond-pearl": GenerationSprites;
        "heartgold-soulsilver": GenerationSprites;
        platinum: GenerationSprites;
    };
    "generation-v": {
        "black-white": GenerationSpritesAnimated;
    };
    "generation-vi": {
        "omegaruby-alphasapphire": GenerationSprites;
        "x-y": GenerationSprites;
    };
    "generation-vii": {
        icons: {
            front_default: string | null;
            front_female: string | null;
        };
        "ultra-sun-ultra-moon": GenerationSprites;
    };
    "generation-viii": {
        icons: {
            front_default: string | null;
            front_female: string | null;
        };
    };
}

export interface GenerationSprites {
    back_default?: string | null;
    back_female?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;
    front_default: string | null;
    front_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female?: string | null;
}

export interface GenerationSpritesAnimated extends GenerationSprites {
    animated: GenerationSprites;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}