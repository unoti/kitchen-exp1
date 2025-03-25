import { KitchenState } from "../../backend/src/kitchenState";

export enum KitchenEventType {
    PLAYER_JOIN = "PLAYER_JOIN",
    MOVE_TO_STATION = "MOVE_TO_STATION",
    GET_ITEM = "GET_ITEM",
    PUT_ITEM = "PUT_ITEM",
    STATION_OP = "STATION_OP",
    STATE_UPDATE = "STATE_UPDATE" // sent from the server when the state changes
}

export interface PlayerJoinEvent {
    type: KitchenEventType.PLAYER_JOIN;
    payload: { name: string };
}

export interface MoveToStationEvent {
    type: KitchenEventType.MOVE_TO_STATION;
    payload: { personId: string; stationName: string; };
}

export interface GetItemEvent {
    type: KitchenEventType.GET_ITEM;
    payload: { fromPersonId: string; itemId: number; qty: number; };
}

export interface PutItemEvent {
    type: KitchenEventType.PUT_ITEM;
    payload: { fromPersonId: string; itemId: number; qty: number; }; // positive qty; will be negated in reducer
}

export interface StationOpEvent {
    type: KitchenEventType.STATION_OP;
    payload: { stationName: string; operationName: string; };
}

// This event is sent from the server when the state changes.
export interface StateUpdateEvent {
    type: KitchenEventType.STATE_UPDATE;
    payload: { state: KitchenState };
}

export type KitchenEvent = PlayerJoinEvent | MoveToStationEvent | GetItemEvent | PutItemEvent | StationOpEvent | StateUpdateEvent;
