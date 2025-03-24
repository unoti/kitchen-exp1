import { KitchenState, initialKitchenState } from "./kitchenState";

export interface LobbyState {
    rooms: {
        [roomId: string]: KitchenState;
    };
}

export enum LobbyActionType {
    ROOM_CREATE = "ROOM_CREATE",
    ROOM_REMOVE = "ROOM_REMOVE"
}

export interface RoomCreateAction {
    type: LobbyActionType.ROOM_CREATE;
    payload: {
        roomId: string;
        kitchenState: KitchenState;
    };
}

export interface RoomRemoveAction {
    type: LobbyActionType.ROOM_REMOVE;
    payload: {
        roomId: string;
    };
}

export type LobbyAction = RoomCreateAction | RoomRemoveAction;

export const initialLobbyState: LobbyState = {
    rooms: {}
};

export function lobbyReducer(state: LobbyState = initialLobbyState, action: LobbyAction): LobbyState {
    switch (action.type) {
        case LobbyActionType.ROOM_CREATE:
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    [action.payload.roomId]: action.payload.kitchenState,
                },
            };
        case LobbyActionType.ROOM_REMOVE:
            const { [action.payload.roomId]: removed, ...rest } = state.rooms;
            return {
                ...state,
                rooms: rest,
            };
        default:
            return state;
    }
}
