import { Request, Response } from 'express';
import { BankingService } from '../services/BankingService';
import { AuthService } from '../services/AuthService';
import { LoggingService } from '../services/LoggingService';

export class BankingController {
    private bankingService = new BankingService();
    private authService = new AuthService();
    private logger = LoggingService.getInstance();

    async processTransaction(req: Request, res: Response): Promise<void> {
        try {
            const isValid = await this.authService.validateToken(req.headers.authorization);
            if (!isValid) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const success = await this.bankingService.processTransaction(req.body);
            res.json({ success });
        } catch (error) {
            this.logger.logError(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAccountDetails(req: Request, res: Response): Promise<void> {
        try {
            const { accountId } = req.params;
            const details = await this.bankingService.getAccountDetails(accountId);
            res.json(details);
        } catch (error) {
            this.logger.logError(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
