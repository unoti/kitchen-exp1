export const unlimitedQty = 9999;

export const ItemTypes = {
    ingredient: 'ingredient',
    tool: 'tool',
    container: 'container',
};

export interface Item {
    id: number;
    name: string;
    type: string;
    uom?: string;
}

export interface ItemMap {
    [id: number]: Item;
}

export interface PeopleMap {
    [playerId: string]: any; // Extend with additional player properties if needed.
}

export interface Operation {
    name: string;
    consumeId: number;
    provideId: number;
    provideQty?: number;
    usingId?: number;
}

export interface Station {
    name: string;
    inventory: { [itemId: number]: number };
    occupiedBy: string | null;
    holdTypes: string[];
    operations?: Operation[];
}

export interface StationMap {
    [stationId: string]: Station;
}

export interface KitchenState {
    items: ItemMap;
    people: PeopleMap;
    stations: StationMap;
}
