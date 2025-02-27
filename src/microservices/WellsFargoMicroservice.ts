import express from 'express';
import { WellsFargoService } from '../services/wellsFargoService';
import { SecurityService } from '../services/SecurityService';
import { rateLimit } from 'express-rate-limit';

export class WellsFargoMicroservice {
  private app: express.Application;
  private service: WellsFargoService;

  constructor() {
    this.app = express();
    this.service = new WellsFargoService();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    }));
  }

  private setupRoutes() {
    this.app.get('/api/accounts/:id', async (req, res) => {
      try {
        const accountInfo = await this.service.getAccountInfo(req.params.id);
        res.json(accountInfo);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/transactions', async (req, res) => {
      try {
        const result = await this.service.createTransaction(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log(`Wells Fargo microservice running on port ${port}`);
    });
  }
}
