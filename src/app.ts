import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { BankingController } from './controllers/BankingController';
import { LoggingService } from './services/LoggingService';
import { rateLimiter, securityHeaders } from './middleware/security';
import { validateRequest } from './middleware/auth';

const app = express();
const logger = LoggingService.getInstance();
const bankingController = new BankingController();
const swaggerDocs = require('./swagger.json');

app.use(securityHeaders);
app.use(rateLimiter);
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true
}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Protected routes
app.use('/api', validateRequest as express.RequestHandler);

app.post('/api/transactions', (req, res) => bankingController.processTransaction(req, res));
app.get('/api/accounts/:accountId', (req, res) => bankingController.getAccountDetails(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.logInfo(`Server running on port ${PORT}`);
});

export default app;
