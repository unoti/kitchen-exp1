# Kitchen Reducer

In this step we're going to detail out our kitchen reducer.

* Implement additional actions that can be sent from the client.
* Add new kinds of actions that need to be sent from the client as appropriate in shared/models/events.ts
* Add unit tests for each operation type in kitchState.test.ts
* Change the existing PLAYER_JOIN to automatically add the player to the first unoccupied station, as our sample code below does.

Below is some code from the reducer of a previous single player version of this game
that we have iterated on quite a bit to reduce code duplication and make the code
smaller and easier to maintain.

Note that this is from a different code base, so think about whether you can use the code as is or if it needs to be adapted.


```ts

function deleteKey(o, key) {
    // Copy object o with key removed.
    const { [key]: _removed, ...updatedItem } = o; // Destructring assignment which removes the key.
    return updatedItem;
}

function updateInventory(existingInventory, item, deltaQty) {
    // Update an inventory and return the updated inventory. deltaQty negative to reduce, positive to increase.
    const existingQty = existingInventory[item.id] ?? 0;
    const newQty = existingQty === unlimitedQty ? unlimitedQty : existingQty + deltaQty;
    if (newQty) {
        return { ...existingInventory, [item.id]: newQty };
    } else {
        return deleteKey(existingInventory, item.id);
    }
}

/** Immutably pulls inventory from fromInventory and puts it into toInventory.
 *  returns [fromInventory, toInventory].
 */ 
function transactInventory(item, deltaQty, fromInventory, toInventory) {
    const updatedFromInventory = updateInventory(fromInventory, item, deltaQty);
    const updatedToInventory = updateInventory(toInventory, item, -deltaQty);
    return [updatedFromInventory, updatedToInventory];
}

function getPerson(state, personId) {
    const person = state.people[personId];
    if (!person) {
        console.log(`Person ${personId} not found`);
        return state;
    }
    return person;
}

function updateStationInventory(state, station, newInventory) {
    const newStation = { ...station, inventory: newInventory };
    const newStations = { ...state.stations, [station.name]: newStation };
    const newState = { ...state, stations: newStations };
    return newState;
}

// Perform an inventory transaction between a person and their station, returning the new state.
// qty: positive means take from station to player. Negative means take from player and add to station.
function transactState(state, itemId, qty, personId) {
    const person = getPerson(state, personId);
    const item = state.items[itemId];
    const stationName = person.station;
    const station = state.stations[stationName];
    const [newPersonInventory, newStationInventory] = transactInventory(
        item, qty, person.inventory, station.inventory);
    const newPerson = { ...person, inventory: newPersonInventory };
    const newStation = { ...station, inventory: newStationInventory };
    const newState = {
        ...state,
        people: { ...state.people, [newPerson.id]: newPerson },
        stations: { ...state.stations, [stationName]: newStation },
    };
    return newState;
}

function kitchenReducer(state, action) {
    console.log(`reduce`);
    console.log(action);
    switch (action.type) {
        case "PLAYER_JOINED": {
            // If player is already there then ignore. Happens in dev mode with events firing twice.
            if (action.player.id in state.people) {
                return state;
            }
            const firstEmptyStation = Object.values(state.stations).find(station => !station.occupiedBy);
            if (!firstEmptyStation) {
                console.log('No empty stations available for new player');
            }

            // Add new player to people object with the station name.
            const updatedPeople = {
                ...state.people,
                [action.player.id]: {...action.player, station: firstEmptyStation.name }
            };

            // Mark the station as occupied by the player.
            const updatedStations = {
                ...state.stations,
                [firstEmptyStation.name]: { ...firstEmptyStation, occupiedBy: action.player}
            };

            const newState = {
                ...state,
                people: updatedPeople,
                stations: updatedStations,
            };
            console.log(newState);
            return newState;
        }
            
        case "MOVE_TO_STATION": {
            const person = getPerson(state, action.personId);
            const newPerson = { ...person, station: action.stationName};
            const oldStation = state.stations[person.station];
            const newStation = state.stations[action.stationName];

            // Move the person to the new station.
            const updatedPeople = {
                ...state.people,
                [action.personId]: newPerson,
            };
            // Remove the person from the old station and add them to the new station.
            let updatedStations = {
                ...state.stations,
                [newStation.name]: { ...newStation, occupiedBy: newPerson },
            };
            if (oldStation) {
                updatedStations = {
                    ...updatedStations,
                    [oldStation.name]: { ...oldStation, occupiedBy: null },
                }
            }
            const newState = { ...state, people: updatedPeople, stations: updatedStations };
            console.log(newState);
            return newState;
        }

        case "GET_ITEM": {
            const newState = transactState(state, action.item.id, action.qty, action.personId);
            console.log(newState);
            return newState;
        }

        case "PUT_ITEM": {
            const qty = -1;
            const newState = transactState(state, action.itemId, qty, action.fromPersonId);
            console.log(newState);
            return newState;
        }

        case "STATION_OP": {
            const station = state.stations[action.stationName];
            const consumeItem = state.items[action.operation.consumeId];
            const provideItem = state.items[action.operation.provideId];
            const afterConsumeInv = updateInventory(station.inventory, consumeItem, -1);
            const provideQty = action.operation.provideQty ?? 1;
            const afterProvideInv = updateInventory(afterConsumeInv, provideItem, provideQty);
            const newState = updateStationInventory(state, station, afterProvideInv);
            return newState;
        }

        default:
            return state;
    }
}
```
## Observations and Next Steps

**Observations:**
- The legacy helper functions (`deleteKey`, `updateInventory`, `transactInventory`, `getPerson`, and `updateStationInventory`) offer a clear, immutable approach to state updates. We can reuse these patterns.
- The legacy PLAYER_JOINED action auto-assigns a player to the first unoccupied station. We can adapt this to our current state representation.
- Additional actions (MOVE_TO_STATION, GET_ITEM, PUT_ITEM, STATION_OP) are well defined in the legacy code, but need to be integrated with our current KitchenState structure and event types.
- Logging and state management practices shown in the legacy code can guide our adapter design, ensuring maintainability and consistency.

**Tasks:**
1. Integrate and refactor legacy helper functions into the new backend state management.
2. Adapt the PLAYER_JOIN action to assign players automatically to the first unoccupied station.
3. Implement the MOVE_TO_STATION action to update player location and station occupancy correctly.
4. Implement GET_ITEM and PUT_ITEM actions for proper inventory transactions.
5. Implement the STATION_OP action to perform station-specific operations and update inventories.
6. Consolidate state update patterns and remove any redundant code.

**Unit Test Scenarios:**
- Verify that `initialKitchenState` initializes with the correct keys and expected station assignments.
- Confirm that an unknown action returns the unchanged state.
- Test that PLAYER_JOIN adds a player and assigns them to an unoccupied station.
- Validate that MOVE_TO_STATION correctly updates a player's station and the occupancy of both the old and new stations.
- Confirm that GET_ITEM properly transfers an item from station inventory to a player's inventory.
- Confirm that PUT_ITEM properly transfers an item from a player’s inventory back to the station.
- Ensure that STATION_OP correctly updates the station's inventory according to the operation performed.
- Create a test for the "Cut Lime" operation, which is a multi step process:
    - join a player
    - move them to 'Utensils' to pick up a knife
    - move to 'Fridge' to get a lime
    - move to 'CuttingBoard'
    - put a lime into the cutting board
    - perform the "Cut Lime" operation
    - finally, assert that the cutting board station inventory now contains exactly two Half Lime items.

## Questions

1. **PLAYER_JOIN Action:**  
   - **Q:** Should we update the new player's state with station assignment?  
   - **A:** Yes, update the player state as appropriate. For now, the player will only have `id` and `name`.

2. **MOVE_TO_STATION Action:**  
   - **Q:** Is a payload with `{ personId, stationName }` acceptable?  
   - **A:** Yes, that's a good payload; the reducer should clear the previous station's `occupiedBy` and assign the new station.

3. **GET_ITEM and PUT_ITEM Actions:**  
   - **Q:** What should the payloads include?  
   - **A:** For GET_ITEM, include `fromPersonId`, `itemId`, and `qty` in the payload. For PUT_ITEM, include `itemId`, `fromPersonId`, and a positive `qty` (which will be negated in the reducer). These payloads should be formally declared and strongly typed with accompanying comments.

4. **STATION_OP Action:**  
   - **Q:** How should the station op action work?  
   - **A:** Include the operation's name in the payload; the reducer will locate the corresponding operation details (which include the quantities) and process the transaction accordingly.

5. **Action Type Enum:**  
   - **Q:** Should we create an enum for all actions?  
   - **A:** Yes, let's create an enum to strongly type all the actions.
