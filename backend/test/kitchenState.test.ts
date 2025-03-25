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
    expect(player).toEqual({ id: keys[0], name: "Alice" });
  });
});
