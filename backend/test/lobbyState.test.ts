import { lobbyReducer, initialLobbyState, LobbyActionType, RoomRemoveAction } from "../src/lobbyState";
import { initialKitchenState } from "../src/kitchenState";

describe("Lobby State", () => {
  it("should initialize with empty rooms", () => {
    expect(initialLobbyState.rooms).toEqual({});
  });

  it("should return same state for unknown action", () => {
    const action = { type: "UNKNOWN" };
    expect(lobbyReducer(initialLobbyState, action as any)).toEqual(initialLobbyState);
  });

  it("should handle ROOM_CREATE action", () => {
    const roomId = "room1";
    const action = {
      type: LobbyActionType.ROOM_CREATE,
      payload: { roomId, kitchenState: initialKitchenState },
    };
    const newState = lobbyReducer(initialLobbyState, action);
    expect(newState.rooms[roomId]).toEqual(initialKitchenState);
  });

  it("should handle ROOM_REMOVE action", () => {
    const roomId = "room1";
    const createAction = {
      type: LobbyActionType.ROOM_CREATE,
      payload: { roomId, kitchenState: initialKitchenState },
    };
    const withRoom = lobbyReducer(initialLobbyState, createAction);
    const removeAction: RoomRemoveAction = {
      type: LobbyActionType.ROOM_REMOVE,
      payload: { roomId },
    };
    const newState = lobbyReducer(withRoom, removeAction);
    expect(newState.rooms[roomId]).toBeUndefined();
    expect(Object.keys(newState.rooms)).toHaveLength(0);
  });
});
