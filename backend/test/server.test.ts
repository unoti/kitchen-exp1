import request from 'supertest';
import express from 'express';

const app = express();
app.get('/', (req, res) => {
    res.send('Chef Backend is running!');
});

describe('GET /', () => {
  it('responds with Chef Backend is running!', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Chef Backend is running!');
    expect(response.status).toBe(200);
  });
});
