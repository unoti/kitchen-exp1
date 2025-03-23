import { Room } from "../../shared/models/Room";
import { Player } from "../../shared/models/Player";

export class LobbyProvider {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3000") {
    this.baseUrl = baseUrl;
  }

  async getActiveRooms(): Promise<Room[]> {
    const response = await fetch(`${this.baseUrl}/rooms`);
    if (!response.ok) {
      throw new Error("Error fetching active rooms");
    }
    const rooms: Room[] = await response.json();
    return rooms;
  }

  async joinRoom(player: Player): Promise<Room> {
    const response = await fetch(`${this.baseUrl}/rooms/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player }),
    });
    if (!response.ok) {
      throw new Error("Error joining room");
    }
    const room: Room = await response.json();
    return room;
  }

  async getStatus(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/status`);
    if (!response.ok) {
      throw new Error("Error fetching status");
    }
    const status = await response.text();
    return status;
  }
}
