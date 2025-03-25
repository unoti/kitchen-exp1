import { initialKitchenState, kitchenReducer } from "../src/kitchenState";

describe("Kitchen State", () => {
  it("should initialize with correct state", () => {
    expect(initialKitchenState).toHaveProperty('items');
    expect(initialKitchenState).toHaveProperty('people');
    expect(initialKitchenState).toHaveProperty('stations');
    expect(initialKitchenState.stations).toHaveProperty('Shelf');
  });

  it("should return the same state for unknown actions", () => {
    const newState = kitchenReducer(initialKitchenState, { type: "UNKNOWN" });
    expect(newState).toEqual(initialKitchenState);
  });

  it("should handle PLAYER_JOIN event", () => {
    const action = { type: "PLAYER_JOIN", payload: { name: "Alice" } };
    const newState = kitchenReducer(initialKitchenState, action);
    const keys = Object.keys(newState.people);
    expect(keys.length).toBe(1);
    const player = newState.people[keys[0]];
    expect(player).toEqual({ id: keys[0], name: "Alice", station: "Shelf", inventory: {} });
    expect(newState.stations["Shelf"].occupiedBy).toBe(keys[0]);
  });
  it("should handle MOVE_TO_STATION event", () => {
    const joinAction = { type: "PLAYER_JOIN", payload: { name: "Bob" } };
    let state = kitchenReducer(initialKitchenState, joinAction);
    const playerId = Object.keys(state.people)[0];
    const moveAction = { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "Fridge" } };
    state = kitchenReducer(state, moveAction);
    expect(state.people[playerId].station).toBe("Fridge");
    expect(state.stations["Fridge"].occupiedBy).toBe(playerId);
  });

  it("should handle GET_ITEM event", () => {
    const joinAction = { type: "PLAYER_JOIN", payload: { name: "Carol" } };
    let state = kitchenReducer(initialKitchenState, joinAction);
    const playerId = Object.keys(state.people)[0];
    state = kitchenReducer(state, { type: "GET_ITEM", payload: { fromPersonId: playerId, itemId: 1, qty: 1 } });
    expect(state.people[playerId].inventory[1]).toBe(1);
    expect(state.stations["Shelf"].inventory[1]).toBe(9999);
  });

  it("should handle PUT_ITEM event", () => {
    const joinAction = { type: "PLAYER_JOIN", payload: { name: "Dave" } };
    let state = kitchenReducer(initialKitchenState, joinAction);
    const playerId = Object.keys(state.people)[0];
    state.people[playerId].inventory = { 4: 2 };
    const putItemAction = { type: "PUT_ITEM", payload: { fromPersonId: playerId, itemId: 4, qty: 1 } };
    state = kitchenReducer(state, putItemAction);
    expect(state.people[playerId].inventory[4]).toBe(1);
    const stationName = state.people[playerId].station;
    expect(state.stations[stationName].inventory[4]).toBe(2);
  });

  it("should perform the 'Cut Lime' operation integration test", () => {
    let state = kitchenReducer(initialKitchenState, { type: "PLAYER_JOIN", payload: { name: "Eve" } });
    const playerId = Object.keys(state.people)[0];
    state = kitchenReducer(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "Utensils" } });
    state = kitchenReducer(state, { type: "GET_ITEM", payload: { fromPersonId: playerId, itemId: 3, qty: 1 } });
    state = kitchenReducer(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "Fridge" } });
    state = kitchenReducer(state, { type: "GET_ITEM", payload: { fromPersonId: playerId, itemId: 6, qty: 1 } });
    state = kitchenReducer(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "CuttingBoard" } });
    state = kitchenReducer(state, { type: "STATION_OP", payload: { stationName: "CuttingBoard", operationName: "Cut Lime" } });
    expect(state.people[playerId].inventory[7]).toBe(2);
  });
});
