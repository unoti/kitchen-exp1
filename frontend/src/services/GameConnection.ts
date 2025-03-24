import { Player } from '../../../shared/models/Player';
import { KitchenEventType } from '../../../shared/models/events';

class GameConnection {
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket("ws://localhost:3000/game");
    this.ws.onopen = () => {
      console.log("WebSocket connection opened.");
    };
    this.ws.onerror = (e) => {
      console.error("WebSocket error:", e);
    };
    this.ws.onmessage = (message) => {
      console.log("WebSocket message received:", message.data);
    };
  }

  connect(player: Player) {
    if (this.ws.readyState === WebSocket.OPEN) {
      const joinEvent = {
        type: KitchenEventType.PLAYER_JOIN,
        payload: player,
      };
      this.ws.send(JSON.stringify(joinEvent));
    } else {
      this.ws.addEventListener(
        "open",
        () => {
          const joinEvent = {
            type: KitchenEventType.PLAYER_JOIN,
            payload: player,
          };
          this.ws.send(JSON.stringify(joinEvent));
        },
        { once: true }
      );
    }
  }

  disconnect() {
    if (
      this.ws.readyState === WebSocket.OPEN ||
      this.ws.readyState === WebSocket.CONNECTING
    ) {
      this.ws.close();
    }
  }
}

export default GameConnection;
