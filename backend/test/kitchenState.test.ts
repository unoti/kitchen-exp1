import { initialKitchenState, kitchenReducer, ITEM_IDS, KitchenState, KitchenAction } from "../src/kitchenState";
import { KitchenEventType } from "../../shared/models/events";

describe("Kitchen State", () => {
  it("should initialize with correct state", () => {
    expect(initialKitchenState).toHaveProperty('items');
    expect(initialKitchenState).toHaveProperty('people');
    expect(initialKitchenState).toHaveProperty('stations');
    expect(initialKitchenState.stations).toHaveProperty('Shelf');
  });

  it("should return the same state for unknown actions", () => {
    const newState = kitchenReducer(initialKitchenState, { type: "UNKNOWN" } as any);
    expect(newState).toEqual(initialKitchenState);
  });

  it("should handle PLAYER_JOIN event", () => {
    const action = { type: KitchenEventType.PLAYER_JOIN, payload: { name: "Alice" } };
    const newState = kitchenReducer(initialKitchenState, action);
    const keys = Object.keys(newState.people);
    expect(keys.length).toBe(1);
    const player = newState.people[keys[0]];
    expect(player).toEqual({ id: keys[0], name: "Alice", station: "Shelf", inventory: {} });
    expect(newState.stations["Shelf"].occupiedBy).toBe(keys[0]);
  });
  it("should handle MOVE_TO_STATION event", () => {
    const joinAction = { type: KitchenEventType.PLAYER_JOIN, payload: { name: "Bob" } };
    let state = kitchenReducer(initialKitchenState, joinAction);
    const playerId = Object.keys(state.people)[0];
    const moveAction = { type: KitchenEventType.MOVE_TO_STATION, payload: { personId: playerId, stationName: "Fridge" } };
    state = kitchenReducer(state, moveAction);
    expect(state.people[playerId].station).toBe("Fridge");
    expect(state.stations["Fridge"].occupiedBy).toBe(playerId);
  });

  it("should handle GET_ITEM event", () => {
    const joinAction = { type: KitchenEventType.PLAYER_JOIN, payload: { name: "Carol" } };
    let state = kitchenReducer(initialKitchenState, joinAction);
    const playerId = Object.keys(state.people)[0];
    state = kitchenReducer(state, { type: KitchenEventType.GET_ITEM, payload: { fromPersonId: playerId, itemId: ITEM_IDS.SUGAR, qty: 1 } });
    expect(state.people[playerId].inventory[ITEM_IDS.SUGAR]).toBe(1);
    expect(state.stations["Shelf"].inventory[ITEM_IDS.SUGAR]).toBe(9999);
  });

  it("should handle PUT_ITEM event", () => {
    const joinAction = { type: KitchenEventType.PLAYER_JOIN, payload: { name: "Dave" } };
    let state = kitchenReducer(initialKitchenState, joinAction);
    const playerId = Object.keys(state.people)[0];
    state.people[playerId].inventory = { [ITEM_IDS.BOWL]: 5 };
    const putItemAction = { type: KitchenEventType.PUT_ITEM, payload: { fromPersonId: playerId, itemId: ITEM_IDS.BOWL, qty: 2 } };
    state = kitchenReducer(state, putItemAction);

    expect(state.people[playerId].inventory[ITEM_IDS.BOWL]).toBe(3);
    const stationName = state.people[playerId].station;
    expect(state.stations[stationName].inventory[ITEM_IDS.BOWL]).toBe(2);
  });

  it("should perform the 'Cut Lime' operation successfully", () => {
    let state = kitchenReducer(initialKitchenState, { type: "PLAYER_JOIN", payload: { name: "Eve" } });
    const playerId = Object.keys(state.people)[0];

    function doAction(state: KitchenState, action: KitchenAction): KitchenState {
      const newState = kitchenReducer(state, action);
      //console.log(`doAction:`, action, JSON.stringify(newState));
      return newState;
    }

    state = doAction(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "Utensils" } });
    state = doAction(state, { type: "GET_ITEM", payload: { fromPersonId: playerId, itemId: ITEM_IDS.KNIFE, qty: 1 } });
    state = doAction(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "Fridge" } });
    state = doAction(state, { type: "GET_ITEM", payload: { fromPersonId: playerId, itemId: ITEM_IDS.LIME, qty: 1 } });
    state = doAction(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "CuttingBoard" } });
    state = doAction(state, { type: "PUT_ITEM", payload: { fromPersonId: playerId, itemId: ITEM_IDS.LIME, qty: 1} });
    state = doAction(state, { type: KitchenEventType.STATION_OP, payload: { stationName: "CuttingBoard", operationName: "Cut Lime" } });
    expect(state.stations['CuttingBoard'].inventory[ITEM_IDS.HALF_LIME]).toBe(2);
  });
});
