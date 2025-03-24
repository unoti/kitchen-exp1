import { initialKitchenState, kitchenReducer } from "../kitchenState";

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
});
