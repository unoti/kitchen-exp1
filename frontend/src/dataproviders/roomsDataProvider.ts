import { Player } from "../models/Player";

export interface Room {
  id: string;
  name: string;
  players: Player[];
}

export function getActiveRooms(): Room[] {
  const rooms: Room[] = [
    {
      id: 'room1',
      name: 'Kitchen Masters',
      players: [
        { id: 'p1', name: 'Alice' },
        { id: 'p2', name: 'Bob' }
      ]
    },
    {
      id: 'room2',
      name: 'Culinary Combat',
      players: []
    }
  ];
  return rooms;
}
