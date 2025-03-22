import { Player } from "./Player";

export interface Room {
  id: string;
  name: string;
  players: Player[];
}
