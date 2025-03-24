export const unlimitedQty = 9999;

export const ItemTypes = {
    ingredient: 'ingredient',
    tool: 'tool',
    container: 'container',
} as const;

export const ITEM_IDS = {
    SUGAR: 1,
    SALT: 2,
    KNIFE: 3,
    BOWL: 4,
    POT: 5,
    LIME: 6,
    HALF_LIME: 7,
    LIME_JUICE: 8,
};

// Unit of Measure: whether the item is counted, weighed, or measured by volume.
export type Uom = 'each' | 'weight' | 'volume';

// Definitions of kinds of items that can exist in the kitchen.
export interface Item {
    id: number;
    name: string;
    type: string;
    uom: Uom;
}

// Something that we can do at a station (e.g., cutting or juicing).
export interface Operation {
    name: string;
    consumeId: number; // Item ID to consume
    provideId: number; // Item ID to provide
    provideQty?: number; // How many are provided when the operation is done
    consumeQty?: number; // How many are consumed when the operation is done
    usingId?: number; // Tool that must be present to do the operation (optional), e.g. knife
}

export interface KitchenState {
    items: { [id: number]: Item }; // Definitions of items that can exist in the kitchen.
    people: { [playerId: string]: any }; // Players that are in the kitchen.
    stations: {
       [stationName: string]: {
         name: string; // Name of the station. This is also the key in the stations map.
         inventory: { [itemId: number]: number }; // Items that are currently in the station's inventory.
         occupiedBy: string | null; // Player ID of the person using this station, or null if not occupied.
         holdTypes: string[]; // Item ids that can be held at this station.
         operations?: Operation[]; // Operations that can be performed at this station.
       }
    };
}

export const initialKitchenState: KitchenState = {
    items: {
        [ITEM_IDS.SUGAR]: { id: ITEM_IDS.SUGAR, name: 'Sugar', type: ItemTypes.ingredient, uom: 'volume' },
        [ITEM_IDS.SALT]: { id: ITEM_IDS.SALT, name: 'Salt', type: ItemTypes.ingredient, uom: 'volume' },
        [ITEM_IDS.KNIFE]: { id: ITEM_IDS.KNIFE, name: 'Knife', type: ItemTypes.tool, uom: 'each' },
        [ITEM_IDS.BOWL]: { id: ITEM_IDS.BOWL, name: 'Bowl', type: ItemTypes.container, uom: 'each' },
        [ITEM_IDS.POT]: { id: ITEM_IDS.POT, name: 'Pot', type: ItemTypes.container, uom: 'each' },
        [ITEM_IDS.LIME]: { id: ITEM_IDS.LIME, name: 'Lime', type: ItemTypes.ingredient, uom: 'each' },
        [ITEM_IDS.HALF_LIME]: { id: ITEM_IDS.HALF_LIME, name: 'Half Lime', type: ItemTypes.ingredient, uom: 'each' },
        [ITEM_IDS.LIME_JUICE]: { id: ITEM_IDS.LIME_JUICE, name: 'Lime Juice', type: ItemTypes.ingredient, uom: 'volume' },
    },
    people: {},
    stations: {
        'Shelf': {
            name: "Shelf",
            inventory: {
                [ITEM_IDS.SUGAR]: unlimitedQty, // Sugar
                [ITEM_IDS.SALT]: unlimitedQty,  // Salt
            },
            occupiedBy: null,
            holdTypes: [ItemTypes.ingredient],
        },
        'Utensils': {
            name: "Utensils",
            inventory: {
                [ITEM_IDS.KNIFE]: 1, // Knife
                [ITEM_IDS.BOWL]: 1,  // Bowl
                [ITEM_IDS.POT]: 1,   // Pot
            },
            occupiedBy: null,
            holdTypes: [ItemTypes.container, ItemTypes.tool],
        },
        'Fridge': {
            name: "Fridge",
            inventory: {
                [ITEM_IDS.LIME]: unlimitedQty, // Lime
            },
            occupiedBy: null,
            holdTypes: [ItemTypes.ingredient],
        },
        'CuttingBoard': {
            name: "CuttingBoard",
            inventory: {},
            occupiedBy: null,
            holdTypes: [ItemTypes.ingredient],
            operations: [
                { name: "Cut Lime", consumeId: ITEM_IDS.LIME, provideId: ITEM_IDS.HALF_LIME, provideQty: 2, usingId: ITEM_IDS.KNIFE },
            ],
        },
        'Juicer': {
            name: "Juicer",
            inventory: {},
            occupiedBy: null,
            holdTypes: [ItemTypes.ingredient],
            operations: [
                { name: "Juice", consumeId: ITEM_IDS.HALF_LIME, provideId: ITEM_IDS.LIME_JUICE },
            ],
        },
        'Stove': {
            name: "Stove",
            inventory: {},
            occupiedBy: null,
            holdTypes: [ItemTypes.container],
        }
    }
};

export type KitchenAction = {
    type: string;
    payload?: any;
};

export function kitchenReducer(state: KitchenState = initialKitchenState, action: KitchenAction): KitchenState {
    switch (action.type) {
        // Future action handling will be implemented here.
        default:
            return state;
    }
}
