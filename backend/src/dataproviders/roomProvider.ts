import { Room } from "../../../shared/models";

export interface RoomProvider {
  getActiveRooms(): Room[];
  addRoom(room: Room): void;
}

export class HardCodedRoomProvider implements RoomProvider {
  private rooms: Room[];

  constructor() {
    this.rooms = [
      { id: 'room1', name: 'Test Room', players: [] }
    ];
  }

  getActiveRooms(): Room[] {
    return this.rooms;
  }

  addRoom(room: Room): void {
    this.rooms.push(room);
  }
}
