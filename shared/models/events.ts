
export enum KitchenEventType {
    PLAYER_JOIN = "PLAYER_JOIN",
    STATE_UPDATE = "STATE_UPDATE" // sent from the server when the state changes
}

export interface PlayerJoinEvent {
    type: KitchenEventType.PLAYER_JOIN;
    payload: { name: string };
}

import { KitchenState } from "../../backend/src/kitchenState";

export interface StateUpdateEvent {
    type: KitchenEventType.STATE_UPDATE;
    payload: { state: KitchenState };
}

export type KitchenEvent = PlayerJoinEvent | StateUpdateEvent;
