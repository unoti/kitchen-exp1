import request from 'supertest';
import { app } from '../src/chefServer';


describe('GET /status', () => {
  it('responds with Chef Backend is running!', async () => {
    const response = await request(app).get('/status');
    expect(response.text).toBe('Chef Backend is running!');
    expect(response.status).toBe(200);
  });
});
