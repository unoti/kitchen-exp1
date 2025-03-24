export enum KitchenEventType {
    PLAYER_JOIN = "PLAYER_JOIN"
}

export interface KitchenEvent {
    type: KitchenEventType;
    payload?: any;
}
