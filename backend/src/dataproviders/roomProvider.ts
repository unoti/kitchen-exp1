import { Room } from "../../../shared/models";

export interface IRoomProvider {
  getActiveRooms(): Room[];
  addRoom(room: Room): void;
}

export class RoomProvider implements IRoomProvider {
  private rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  getActiveRooms(): Room[] {
    return this.rooms;
  }

  addRoom(room: Room): void {
    this.rooms.push(room);
  }
}
