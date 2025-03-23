# Kitchen Initial State

In this milestone we're setting up what our initial state will look like for a new kitchen.

Along the way we will need to establish shared models we will use both for expressing
this state internally on the backend, rendering it on the front end, and communicating
that state between the backend and frontend.

Here are some data structure ideas we have for expressing the various stations and
the things that are contained within them.


```typescript
export const unlimitedQty = 9999;

export const ItemTypes = {
    ingredient: 'ingredient',
    tool: 'tool',
    container: 'container',
};
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

const initialState = {
    items: {
        [ITEM_IDS.SUGAR]: { id: ITEM_IDS.SUGAR, name: 'Sugar', type: ItemTypes.ingredient, uom: 'volume' },
        [ITEM_IDS.SALT]: { id: ITEM_IDS.SALT, name: 'Salt', type: ItemTypes.ingredient, uom: 'volume' },
        [ITEM_IDS.KNIFE]: { id: ITEM_IDS.KNIFE, name: 'Knife', type: ItemTypes.tool },
        [ITEM_IDS.BOWL]: { id: ITEM_IDS.BOWL, name: 'Bowl', type: ItemTypes.container },
        [ITEM_IDS.POT]: { id: ITEM_IDS.POT, name: 'Pot', type: ItemTypes.container },
        [ITEM_IDS.LIME]: { id: ITEM_IDS.LIME, name: 'Lime', type: ItemTypes.ingredient, uom: 'each'},
        [ITEM_IDS.HALF_LIME]: { id: ITEM_IDS.HALF_LIME, name: 'Half Lime', type: ItemTypes.ingredient, uom: 'each' },
        [ITEM_IDS.LIME_JUICE]: { id: ITEM_IDS.LIME_JUICE, name: 'Lime Juice', type: ItemTypes.ingredient, uom: 'ml' },
    },

    people: {}, // Key: playerId. We'll seed this with a first player by submitting an action below.
    stations: {
        'Shelf': {
            name: "Shelf",
            inventory: {
                1: unlimitedQty, // Sugar
                2: unlimitedQty, // Salt
            },
            occupiedBy: null,
            holdTypes: [ItemTypes.ingredient],
        },
        'Utensils': {
            name: "Utensils",
            inventory: {
                3: 1, // Knife. This means there is qty 1 knife here.
                4: 1, // Bowl
                5: 1, // Pot
            },
            occupiedBy: null,
            holdTypes: [ItemTypes.container, ItemTypes.tool],
        },
        'Fridge': {
            name: "Fridge",
            inventory: {
                6: unlimitedQty, // Lime
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
                { name: "Cut Lime", consumeId: ITEM_IDS.LIME, provideId: ITEM_IDS.HALF_LIME, provideQty: 2, usingId: ITEM_IDS.KNIFE}, // Cut limes into half limes using knife
            ],
        },
        'Juicer': {
            name: "Juicer",
            inventory: {},
            occupiedBy: null,
            holdTypes: [ItemTypes.ingredient],
            operations: [
                { name: "Juice", consumeId: ITEM_IDS.HALF_LIME, provideId: ITEM_IDS.LIME_JUICE, },
            ],
        },
        'Stove': {
            name: "Stove",
            inventory: {},
            occupiedBy: null,
            holdTypes: [ItemTypes.container],
        }
    }
}
```

This kind of setup should enable us to express the state and work with it easily and flexibly.

