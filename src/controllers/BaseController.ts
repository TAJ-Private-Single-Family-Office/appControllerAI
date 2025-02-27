import { Request, Response } from 'express';
import { performance } from 'perf_hooks';

/**
 * Abstract base controller providing common functionality for all controllers
 * @abstract
 */
export abstract class BaseController {
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds

  /**
   * Executes the controller action
   * @param req - Express request object
   * @param res - Express response object
   */
  protected async execute(req: Request, res: Response): Promise<void> {
    const startTime = performance.now();
    const timeoutPromise = this.createTimeout();

    try {
      const result = await Promise.race([
        this.processRequest(req),
        timeoutPromise
      ]);

      const executionTime = performance.now() - startTime;
      res.setHeader('X-Response-Time', `${executionTime}ms`);
      
      res.status(200)
        .set('Cache-Control', this.getCacheControl(req))
        .json(result);
    } catch (error) {
      this.handleError(error, res);
    } finally {
      // Clean up resources
      this.cleanup();
    }
  }

  /**
   * Process the incoming request
   * @param req - Express request object
   * @returns Promise resolving to the response data
   */
  protected abstract processRequest(req: Request): Promise<any>;

  /**
   * Handles errors and sends appropriate response
   * @param error - Error object
   * @param res - Express response object
   */
  protected handleError(error: any, res: Response): void {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else if (error.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized access' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  private getCacheControl(req: Request): string {
    return req.method === 'GET' ? 'public, max-age=300' : 'no-store';
  }

  private createTimeout(): Promise<never> {
    return new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), this.REQUEST_TIMEOUT)
    );
  }

  private cleanup(): void {
    // Implement resource cleanup
    global.gc?.();
  }
}
