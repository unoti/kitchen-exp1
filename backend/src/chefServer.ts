import express from 'express';
import cors from 'cors';
import http from 'http';
import { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { kitchenReducer, initialKitchenState } from "./kitchenState";

interface PlayerWebsocket extends WebSocket {
  playerId?: string;
}

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

 // Health check endpoint
app.get('/status', (req: Request, res: Response) => {
  res.send('Chef Backend is running!');
});

if (require.main === module) {
  console.log("Starting Chef Backend...");
  let kitchenState = initialKitchenState;
  const httpServer = http.createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/game' });

  wss.on('connection', (ws, req) => {
    const playerWs = ws as PlayerWebsocket;
    console.log('New WebSocket connection:', req.url, "player id:", playerWs.playerId);

    playerWs.on('message', (message) => {
      console.log('Received WebSocket message from player', playerWs.playerId, ":", message.toString());
      let parsedMessage;
      try {
          parsedMessage = JSON.parse(message.toString());
      } catch (error) {
          console.error("Error parsing message:", error);
          return;
      }
      kitchenState = kitchenReducer(kitchenState, parsedMessage);
      if (parsedMessage.type === "PLAYER_JOIN") {
          playerWs.playerId = kitchenState.lastPlayerId.toString();
      }
      console.log("Updated kitchen state:", kitchenState);
    });

    playerWs.send('Welcome to the Chef WebSocket server!');
  });

  
  httpServer.listen(port, () => {
    console.log(`Chef Backend listening at http://localhost:${port}`);
  });

  console.log("Chef Backend initialization complete");
}
