import { initialKitchenState, kitchenReducer, ITEM_IDS, KitchenState, KitchenAction } from "../src/kitchenState";
import { KitchenEventType } from "../../shared/models/events";


function kitchenWithPlayer(name: string): KitchenState {
  const action = { type: KitchenEventType.PLAYER_JOIN, payload: { name } } as KitchenAction;
  const state = kitchenReducer(initialKitchenState, action);
  return state;
}

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
    const newState = kitchenWithPlayer("Alice");
    const keys = Object.keys(newState.people);
    expect(keys.length).toBe(1);
    const player = newState.people[keys[0]];
    expect(player).toEqual({ id: keys[0], name: "Alice", station: "Shelf", inventory: {} });
    expect(newState.stations["Shelf"].occupiedBy).toBe(keys[0]);
  });

  it("should handle MOVE_TO_STATION event", () => {
    let state = kitchenWithPlayer("Bob");
    const playerId = Object.keys(state.people)[0];
    const moveAction = { type: KitchenEventType.MOVE_TO_STATION, payload: { personId: playerId, stationName: "Fridge" } } as KitchenAction;
    state = kitchenReducer(state, moveAction);
    expect(state.people[playerId].station).toBe("Fridge");
    expect(state.stations["Fridge"].occupiedBy).toBe(playerId);
  });

  it("should handle GET_ITEM event", () => {
    let state = kitchenWithPlayer("Carol");
    const playerId = Object.keys(state.people)[0];
    state = kitchenReducer(state, { type: KitchenEventType.GET_ITEM, payload: { fromPersonId: playerId, itemId: ITEM_IDS.SUGAR, qty: 1 } });
    expect(state.people[playerId].inventory[ITEM_IDS.SUGAR]).toBe(1);
    expect(state.stations["Shelf"].inventory[ITEM_IDS.SUGAR]).toBe(9999);
  });

  it("should handle PUT_ITEM event", () => {
    let state = kitchenWithPlayer("Dave");
    const playerId = Object.keys(state.people)[0];
    state.people[playerId].inventory = { [ITEM_IDS.BOWL]: 5 };
    const putItemAction = {
      type: KitchenEventType.PUT_ITEM,
      payload: { fromPersonId: playerId, itemId: ITEM_IDS.BOWL, qty: 2 } } as KitchenAction;
    state = kitchenReducer(state, putItemAction);

    expect(state.people[playerId].inventory[ITEM_IDS.BOWL]).toBe(3);
    const stationName = state.people[playerId].station;
    expect(state.stations[stationName].inventory[ITEM_IDS.BOWL]).toBe(2);
  });

  it("should perform the 'Cut Lime' operation successfully", () => {
    let state = kitchenWithPlayer("Eve");
    const playerId = Object.keys(state.people)[0];

    function doAction(state: KitchenState, action: KitchenAction): KitchenState {
      const newState = kitchenReducer(state, action);
      //console.log(`doAction:`, action, JSON.stringify(newState));
      return newState;
    }

    state = doAction(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "Utensils" } } as KitchenAction);
    state = doAction(state, { type: "GET_ITEM", payload: { fromPersonId: playerId, itemId: ITEM_IDS.KNIFE, qty: 1 } } as KitchenAction);
    state = doAction(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "Fridge" } } as KitchenAction);
    state = doAction(state, { type: "GET_ITEM", payload: { fromPersonId: playerId, itemId: ITEM_IDS.LIME, qty: 1 } } as KitchenAction);
    state = doAction(state, { type: "MOVE_TO_STATION", payload: { personId: playerId, stationName: "CuttingBoard" } } as KitchenAction);
    state = doAction(state, { type: "PUT_ITEM", payload: { fromPersonId: playerId, itemId: ITEM_IDS.LIME, qty: 1} } as KitchenAction);
    state = doAction(state, { type: KitchenEventType.STATION_OP, payload: { stationName: "CuttingBoard", operationName: "Cut Lime" } } as KitchenAction);
    expect(state.stations['CuttingBoard'].inventory[ITEM_IDS.HALF_LIME]).toBe(2);
  });
});
