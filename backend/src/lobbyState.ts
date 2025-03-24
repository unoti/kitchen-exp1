import { KitchenState } from "./kitchenState";

export interface LobbyState {
    rooms: {
        [roomId: string]: KitchenState;
    };
    lastRoomId: number;
    lastPlayerId: number;
}

export enum LobbyActionType {
    ROOM_CREATE = "ROOM_CREATE",
    ROOM_REMOVE = "ROOM_REMOVE"
}

export interface RoomCreateAction {
    type: LobbyActionType.ROOM_CREATE;
    payload: {
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
    rooms: {},
    lastRoomId: 0,
    lastPlayerId: 0
};

export function lobbyReducer(state: LobbyState = initialLobbyState, action: LobbyAction): LobbyState {
    switch (action.type) {
        case LobbyActionType.ROOM_CREATE:
            const newRoomId = (state.lastRoomId + 1).toString();
            return {
                ...state,
                lastRoomId: state.lastRoomId + 1,
                rooms: {
                    ...state.rooms,
                    [newRoomId]: action.payload.kitchenState,
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
