import request from 'supertest';
import { app } from '../src/chefServer';
import { RoomProvider } from '../src/dataproviders/roomProvider';

describe('Room Endpoints', () => {
  it('GET /rooms should return an empty array when no rooms exist', async () => {
    const response = await request(app).get('/rooms');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  it('POST /rooms/join should create a room when none exist', async () => {
    const player = { id: 'p1', name: 'Alice' };
    const response = await request(app).post('/rooms/join').send({ player });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Default Room');
    expect(response.body.players).toContainEqual(player);
  });

  it('POST /rooms/join should add a player to an existing room', async () => {
    const player1 = { id: 'p1', name: 'Alice' };
    await request('http://localhost:3000').post('/rooms/join').send({ player: player1 });
    const player2 = { id: 'p2', name: 'Bob' };
    const response = await request('http://localhost:3000').post('/rooms/join').send({ player: player2 });
    expect(response.status).toBe(200);
    expect(response.body.players).toContainEqual(player2);
  });
});

describe('Room Provider', () => {
  it("RoomProvider starts empty and adds a room", () => {
    const provider = new RoomProvider();
    expect(provider.getActiveRooms().length).toBe(0);
    const testRoom = { id: 'test1', name: 'Test Room', players: [] };
    provider.addRoom(testRoom);
    expect(provider.getActiveRooms().length).toBe(1);
  });
});

describe('GET /status', () => {
  it('responds with Chef Backend is running!', async () => {
    const response = await request(app).get('/status');
    expect(response.text).toBe('Chef Backend is running!');
    expect(response.status).toBe(200);
  });
});
