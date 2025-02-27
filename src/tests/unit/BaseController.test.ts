import { Request, Response } from 'express';
import { BaseController } from '../../controllers/BaseController';
import { ValidationError, UnauthorizedError } from '../../utils/ErrorHandler';

class TestController extends BaseController {
  protected async processRequest(req: Request): Promise<any> {
    switch (req.query.test) {
      case 'success':
        return { success: true };
      case 'validation':
        throw new ValidationError('Validation failed');
      case 'unauthorized':
        throw new UnauthorizedError();
      default:
        throw new Error('Unknown error');
    }
  }
}

describe('BaseController', () => {
  let controller: TestController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    controller = new TestController();
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should handle successful requests', async () => {
    req.query = { test: 'success' };
    await controller.execute(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should handle validation errors', async () => {
    req.query = { test: 'validation' };
    await controller.execute(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
