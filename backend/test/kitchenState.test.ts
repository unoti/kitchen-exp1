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
    const player = { id: "player1", name: "Alice" };
    const action = { type: "PLAYER_JOIN", payload: player };
    const newState = kitchenReducer(initialKitchenState, action);
    expect(newState.people).toHaveProperty("player1", player);
  });
});
