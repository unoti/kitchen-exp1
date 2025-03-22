import request from 'supertest';
import express from 'express';

import { HardCodedRoomProvider } from '../src/dataproviders/roomProvider';

const app = express();
app.get('/', (req, res) => {
    res.send('Chef Backend is running!');
});

describe('Room Provider', () => {
  it("HardCodedRoomProvider returns at least one room", () => {
    const provider = new HardCodedRoomProvider();
    expect(provider.getActiveRooms().length).toBeGreaterThan(0);
  });
});

describe('GET /', () => {
  it('responds with Chef Backend is running!', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Chef Backend is running!');
    expect(response.status).toBe(200);
  });
});
