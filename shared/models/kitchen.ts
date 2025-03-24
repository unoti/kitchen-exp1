 // Quantity representing an unlimited supply.
export const unlimitedQty = 9999;

 // Types of items available in the kitchen (ingredient, tool, container).
export const ItemTypes = {
    ingredient: 'ingredient',
    tool: 'tool',
    container: 'container',
};

export type Uom = 'each' | 'weight' | 'volume';

 // A kind of item, and what it can do when it exists.
export interface Item {
    id: number;
    name: string;
    type: string;
    uom: Uom;
}

 // Mapping of item IDs to Item objects.
export interface ItemMap {
    [id: number]: Item;
}

 // Mapping of player IDs to player objects.
export interface PeopleMap {
    [playerId: string]: any; // Extend with additional player properties if needed.
}

 // Operation that defines a transformation at a station (e.g., cutting or juicing).
export interface Operation {
    name: string;
    consumeId: number;
    provideId: number;
    provideQty?: number;
    usingId?: number;
}

 // Definition of a kitchen station including inventory, occupancy, and possible operations.
export interface Station {
    name: string;
    inventory: { [itemId: number]: number };
    occupiedBy: string | null;
    holdTypes: string[];
    operations?: Operation[];
}

 // Mapping of station IDs to Station objects.
export interface StationMap {
    [stationId: string]: Station;
}

 // Complete state of the kitchen including items, people, and stations.
export interface KitchenState {
    items: ItemMap;
    people: PeopleMap;
    stations: StationMap;
}
