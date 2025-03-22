import request from 'supertest';
import express from 'express';

import { RoomProvider } from '../src/dataproviders/roomProvider';

const app = express();
app.get('/', (req, res) => {
    res.send('Chef Backend is running!');
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

describe('GET /', () => {
  it('responds with Chef Backend is running!', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Chef Backend is running!');
    expect(response.status).toBe(200);
  });
});
