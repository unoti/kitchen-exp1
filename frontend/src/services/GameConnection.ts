import { Player } from '../../../shared/models/Player';
import { KitchenEvent, KitchenEventType } from '../../../shared/models/events';

class GameConnection {
  public onEvent?: (event: any) => void;
  private ws: WebSocket | null = null;
  private joined: boolean = false; // Flag to ensure join event is only sent once

  constructor(onEvent?: (event: any) => void) {
    this.onEvent = onEvent;
  }

  connect(player: Player) {
    // If we've already connected and sent the join event, do nothing.
    if (this.joined) {
      console.warn("Connect already called; join event already sent.");
      return;
    }

    if (!this.ws) {
      this.ws = new WebSocket("ws://localhost:3000/game");
      this.ws.onopen = () => {
         console.log("WebSocket connection opened.");
      };
      this.ws.onerror = (e) => {
         console.error("WebSocket error:", e);
      };
      this.ws.onmessage = (message) => {
         try {
           const parsedEvent = JSON.parse(message.data);
           if (this.onEvent) {
             this.onEvent(parsedEvent);
           } else {
             console.log("WebSocket message received:", parsedEvent);
           }
         } catch (error) {
           console.error("Error parsing websocket message:", error);
         }
      };
    }

    const sendJoin = () => {
      const joinEvent = {
        type: KitchenEventType.PLAYER_JOIN,
        payload: player,
      };
      this.ws!.send(JSON.stringify(joinEvent));
      this.joined = true;
    };

    if (this.ws!.readyState === WebSocket.OPEN) {
      sendJoin();
    } else if (this.ws!.readyState === WebSocket.CONNECTING) {
      // Add a one-time listener to send the join event once the connection is open.
      this.ws!.addEventListener("open", sendJoin, { once: true });
    } else {
      console.error("WebSocket is in an unexpected state:", this.ws!.readyState);
    }
  }

  // Add the send method to handle sending events to the server
  send(event: KitchenEvent) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error("Cannot send event: WebSocket is not connected");
      return;
    }
    
    try {
      this.ws.send(JSON.stringify(event));
    } catch (error) {
      console.error("Error sending event:", error);
    }
  }

  disconnect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }
}

export default GameConnection;
