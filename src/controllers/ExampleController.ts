import { Request } from 'express';
import { BaseController } from './BaseController';

export class ExampleController extends BaseController {
  protected async processRequest(req: Request): Promise<any> {
    switch (req.method) {
      case 'GET':
        return { message: 'Example GET response' };
      case 'POST':
        return { message: 'Example POST response', data: req.body };
      default:
        throw new Error('Method not supported');
    }
  }
}
