import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AuthService } from '../services/AuthService';

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

export const securityHeaders = helmet();

export const validateRequest = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const authService = new AuthService();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const isValid = await authService.validateToken(token);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Authentication error' });
    }
};
