import request from 'supertest';
import express from 'express';
import router from '../../routes/api';
import { generateToken } from '../../middleware/auth';

const app = express();
app.use(express.json());
app.use('/api', router);

describe('API Integration Tests', () => {
  const validToken = generateToken({ userId: '123' });

  describe('GET /api/example', () => {
    it('should require authentication', async () => {
      const response = await request(app).get('/api/example');
      expect(response.status).toBe(401);
    });

    it('should return success with valid token', async () => {
      const response = await request(app)
        .get('/api/example')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/example', () => {
    it('should process POST requests', async () => {
      const response = await request(app)
        .post('/api/example')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ test: 'data' });
      expect(response.status).toBe(200);
    });
  });
});
