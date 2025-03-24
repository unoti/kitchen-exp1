import express from 'express';
import cors from 'cors';
import http from 'http';
import { Request, Response } from 'express';
import { RoomProvider } from './dataproviders/roomProvider';
import { initialLobbyState, lobbyReducer } from './lobbyState';
import { WebSocketServer, WebSocket } from 'ws';

interface PlayerWebsocket extends WebSocket {
  playerId?: string;
}

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const roomProvider = new RoomProvider();
let lobbyState = initialLobbyState;

// GET /rooms - Returns a list of active rooms
app.get('/rooms', (req: Request, res: Response) => {
  res.json(roomProvider.getActiveRooms());
});

// POST /rooms/join - Adds a player to a room.
// If no room exists, it creates a new room with a default name.
app.post('/rooms/join', (req: Request, res: Response) => {
  const { player } = req.body;
  if (!player) {
    console.error("Join room request failed: Missing player information");
    return res.status(400).json({ error: 'Missing player information' });
  }
  
  let rooms = roomProvider.getActiveRooms();
  let room;
  if (rooms.length === 0) {
    room = {
      id: 'room-' + Date.now(),
      name: 'Default Room',
      players: [player]
    };
    roomProvider.addRoom(room);
  } else {
    room = rooms[0];
    room.players.push(player);
  }
  console.log("Join room successful:", room);
  res.json(room);
});

 // Health check endpoint
app.get('/status', (req: Request, res: Response) => {
  res.send('Chef Backend is running!');
});

if (require.main === module) {
  console.log("Starting Chef Backend...");
  const httpServer = http.createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/game' });

  wss.on('connection', (ws, req) => {
    const playerWs = ws as PlayerWebsocket;
    console.log('New WebSocket connection:', req.url, "player id:", playerWs.playerId);

    playerWs.on('message', (message) => {
      console.log('Received WebSocket message from player', playerWs.playerId, ":", message.toString());
    });

    playerWs.send('Welcome to the Chef WebSocket server!');
  });

  
  httpServer.listen(port, () => {
    console.log(`Chef Backend listening at http://localhost:${port}`);
  });

  console.log("Chef Backend initialization complete");
}
