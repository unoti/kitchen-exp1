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

const initialState = {
    items: {
        1: { id: 1, name: 'Sugar', type: ItemTypes.ingredient, uom: 'volume' },
        2: { id: 2, name: 'Salt', type: ItemTypes.ingredient, uom: 'volume' },
        3: { id: 3, name: 'Knife', type: ItemTypes.tool },
        4: { id: 4, name: 'Bowl', type: ItemTypes.container },
        5: { id: 5, name: 'Pot', type: ItemTypes.container },
        6: { id: 6, name: 'Lime', type: ItemTypes.ingredient, uom: 'each'},
        7: { id: 7, name: 'Half Lime', type: ItemTypes.ingredient, uom: 'each' },
        8: { id: 8, name: 'Lime Juice', type: ItemTypes.ingredient, uom: 'ml' },
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
                { name: "Cut Lime", consumeId: 6, provideId: 7, provideQty: 2, usingId: 3}, // Cut limes into half limes using knife
            ],
        },
        'Juicer': {
            name: "Juicer",
            inventory: {},
            occupiedBy: null,
            holdTypes: [ItemTypes.ingredient],
            operations: [
                { name: "Juice", consumeId: 7, provideId: 8, },
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

