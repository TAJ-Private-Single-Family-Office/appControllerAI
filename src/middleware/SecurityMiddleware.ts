import { Request, Response, NextFunction } from 'express';
import { AIService } from '../services/AIService';
import { AuthService } from '../services/AuthService';

export class SecurityMiddleware {
    private aiService: AIService;
    private authService: AuthService;

    constructor() {
        this.aiService = new AIService();
        this.authService = new AuthService();
    }

    async validateRequest(req: Request, res: Response, next: NextFunction) {
        try {
            await this.validateToken(req);
            await this.checkRiskScore(req);
            await this.validateMFA(req);
            next();
        } catch (error) {
            res.status(401).json({ error: 'Security validation failed' });
        }
    }

    private async validateToken(req: Request): Promise<void> {
        const token = req.headers.authorization;
        if (!token || !await this.authService.verifyToken(token)) {
            throw new Error('Invalid token');
        }
    }

    private async checkRiskScore(req: Request): Promise<void> {
        const riskScore = await this.aiService.calculateRiskScore(req);
        if (riskScore > 0.7) {
            throw new Error('High risk request detected');
        }
    }

    private async validateMFA(req: Request): Promise<void> {
        if (req.body.requiresMFA) {
            const mfaToken = req.headers['mfa-token'];
            if (!await this.authService.verifyMFA(mfaToken)) {
                throw new Error('MFA validation failed');
            }
        }
    }
}
