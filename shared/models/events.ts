
export enum KitchenEventType {
    PLAYER_JOIN = "PLAYER_JOIN"
}

export interface PlayerJoinEvent {
    type: KitchenEventType.PLAYER_JOIN;
    payload: { name: string };
}

export type KitchenEvent = PlayerJoinEvent;
