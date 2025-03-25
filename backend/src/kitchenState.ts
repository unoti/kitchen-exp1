import { KitchenEventType } from "../../shared/models/events";
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
    lastPlayerId: number;
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
    lastPlayerId: 0,
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

export type KitchenAction =
  | { type: typeof KitchenEventType.PLAYER_JOIN; payload: { name: string } }
  | { type: typeof KitchenEventType.MOVE_TO_STATION; payload: { personId: string; stationName: string } }
  | { type: typeof KitchenEventType.GET_ITEM; payload: { fromPersonId: string; itemId: number; qty: number } }
  | { type: typeof KitchenEventType.PUT_ITEM; payload: { fromPersonId: string; itemId: number; qty: number } }
  | { type: typeof KitchenEventType.STATION_OP; payload: { stationName: string; operationName: string } }
  | { type: typeof KitchenEventType.STATE_UPDATE; payload: { state: KitchenState } };

function deleteKey(o: any, key: string) {
    const { [key]: _removed, ...updatedItem } = o;
    return updatedItem;
}

function updateInventory(existingInventory: { [itemId: number]: number }, item: any, deltaQty: number) {
    const existingQty = existingInventory[item.id] ?? 0;
    const newQty = existingQty === unlimitedQty ? unlimitedQty : existingQty + deltaQty;
    if (newQty) {
        return { ...existingInventory, [item.id]: newQty };
    } else {
        return deleteKey(existingInventory, String(item.id));
    }
}

function transactInventory(item: any, deltaQty: number, fromInventory: { [itemId: number]: number }, toInventory: { [itemId: number]: number }) {
    const updatedFromInventory = updateInventory(fromInventory, item, deltaQty);
    const updatedToInventory = updateInventory(toInventory, item, -deltaQty);
    return [updatedFromInventory, updatedToInventory];
}

function getPerson(state: KitchenState, personId: string) {
    const person = state.people[personId];
    if (!person) {
        console.log(`Person ${personId} not found`);
        return null;
    }
    return person;
}

function updateStationInventory(state: KitchenState, station: any, newInventory: { [itemId: number]: number }) {
    const newStation = { ...station, inventory: newInventory };
    const newStations = { ...state.stations, [station.name]: newStation };
    return { ...state, stations: newStations };
}

function transactState(state: KitchenState, itemId: number, qty: number, personId: string): KitchenState {
    const person = getPerson(state, personId);
    if (!person) return state;
    const item = state.items[itemId];
    const stationName = person.station;
    const station = state.stations[stationName];
    const [newPersonInventory, newStationInventory] = transactInventory(
        item, qty, person.inventory || {}, station.inventory
    );
    const newPerson = { ...person, inventory: newPersonInventory };
    return {
        ...state,
        people: { ...state.people, [personId]: newPerson },
        stations: { ...state.stations, [stationName]: { ...station, inventory: newStationInventory } },
    };
}

export function kitchenReducer(state: KitchenState = initialKitchenState, action: KitchenAction): KitchenState {
    switch (action.type) {
        case KitchenEventType.PLAYER_JOIN: {
            const newId = state.lastPlayerId + 1;
            const id = newId.toString();
            const firstEmptyStation = Object.values(state.stations).find(station => !station.occupiedBy);
            if (!firstEmptyStation) {
                console.log('No empty stations available for new player');
            }
            const newPlayer = { id, name: action.payload.name, station: firstEmptyStation ? firstEmptyStation.name : null, inventory: {} };
            return {
                ...state,
                lastPlayerId: newId,
                people: {
                    ...state.people,
                    [id]: newPlayer,
                },
                stations: firstEmptyStation ? {
                    ...state.stations,
                    [firstEmptyStation.name]: { ...firstEmptyStation, occupiedBy: id },
                } : state.stations,
            };
        }

        case KitchenEventType.MOVE_TO_STATION: {
            const person = getPerson(state, action.payload.personId);
            if (!person) return state;
            const oldStation = state.stations[person.station];
            const newStation = state.stations[action.payload.stationName];
            if (!newStation) {
                console.log(`Station ${action.payload.stationName} not found`);
                return state;
            }
            const updatedPeople = {
                ...state.people,
                [action.payload.personId]: { ...person, station: action.payload.stationName },
            };
            let updatedStations = {
                ...state.stations,
                [action.payload.stationName]: { ...newStation, occupiedBy: action.payload.personId },
            };
            if (oldStation) {
                updatedStations = {
                    ...updatedStations,
                    [oldStation.name]: { ...oldStation, occupiedBy: null },
                };
            }
            return { ...state, people: updatedPeople, stations: updatedStations };
        }

        case KitchenEventType.GET_ITEM: {
            return transactState(state, action.payload.itemId, action.payload.qty, action.payload.fromPersonId);
        }

        case KitchenEventType.PUT_ITEM: {
            return transactState(state, action.payload.itemId, -action.payload.qty, action.payload.fromPersonId);
        }

        case KitchenEventType.STATION_OP: {
            const station = state.stations[action.payload.stationName];
            if (!station || !station.operations) {
                console.log(`Station ${action.payload.stationName} or its operations not found`);
                return state;
            }
            const operation = station.operations.find((op: any) => op.name === action.payload.operationName);
            if (!operation) {
                console.log(`Operation ${action.payload.operationName} not found at station ${action.payload.stationName}`);
                return state;
            }
            const consumeItem = state.items[operation.consumeId];
            const provideItem = state.items[operation.provideId];
            const consumeQty = operation.consumeQty !== undefined ? operation.consumeQty : 1;
            const provideQty = operation.provideQty !== undefined ? operation.provideQty : 1;
            const afterConsumeInv = updateInventory(station.inventory, consumeItem, -consumeQty);
            const afterProvideInv = updateInventory(afterConsumeInv, provideItem, provideQty);

            const newState  = updateStationInventory(state, station, afterProvideInv);
            return newState;
        }

        default:
            return state;
    }
}
