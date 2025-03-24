import { Player } from '../../../shared/models/Player';
import { KitchenEventType } from '../../../shared/models/events';

class GameConnection {
  private ws: WebSocket;
  private joined: boolean = false; // Flag to ensure join event is only sent once

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
    // If we've already connected and sent the join event, do nothing.
    if (this.joined) {
      console.warn("Connect already called; join event already sent.");
      return;
    }

    const sendJoin = () => {
      const joinEvent = {
        type: KitchenEventType.PLAYER_JOIN,
        payload: player,
      };
      this.ws.send(JSON.stringify(joinEvent));
      this.joined = true;
    };

    if (this.ws.readyState === WebSocket.OPEN) {
      sendJoin();
    } else if (this.ws.readyState === WebSocket.CONNECTING) {
      // Add a one-time listener to send the join event once the connection is open.
      this.ws.addEventListener("open", sendJoin, { once: true });
    } else {
      console.error("WebSocket is in an unexpected state:", this.ws.readyState);
    }
  }

  disconnect() {
      this.ws.close();
  }
}

export default GameConnection;
