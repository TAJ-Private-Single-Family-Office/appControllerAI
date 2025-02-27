import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

export class RateLimiter {
    private redis: Redis;
    private windowMs: number;
    private maxRequests: number;

    constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
        this.redis = new Redis(process.env.REDIS_URL);
        this.windowMs = windowMs;
        this.maxRequests = maxRequests;
    }

    public middleware = async (req: Request, res: Response, next: NextFunction) => {
        const key = this.getKey(req);
        const requests = await this.incrementRequests(key);

        if (requests > this.maxRequests) {
            return res.status(429).json({
                error: 'Too many requests',
                retryAfter: this.windowMs / 1000
            });
        }

        next();
    };

    private getKey(req: Request): string {
        return `ratelimit:${req.ip}:${req.path}`;
    }

    private async incrementRequests(key: string): Promise<number> {
        const multi = this.redis.multi();
        multi.incr(key);
        multi.pexpire(key, this.windowMs);
        const results = await multi.exec();
        return results?.[0]?.[1] as number || 0;
    }
}
