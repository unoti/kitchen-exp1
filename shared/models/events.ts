import { Player } from "./Player";

export enum KitchenEventType {
    PLAYER_JOIN = "PLAYER_JOIN"
}

export interface PlayerJoinEvent {
    type: KitchenEventType.PLAYER_JOIN;
    payload: Player;
}

export type KitchenEvent = PlayerJoinEvent;
