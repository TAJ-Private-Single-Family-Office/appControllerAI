# Usage Examples

## Creating a New Controller

```typescript
import { Request } from 'express';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
  protected async processRequest(req: Request): Promise<any> {
    switch (req.method) {
      case 'GET':
        return await this.getUsers();
      case 'POST':
        return await this.createUser(req.body);
      default:
        throw new Error('Method not supported');
    }
  }

  private async getUsers() {
    // Implementation
  }

  private async createUser(data: any) {
    // Implementation
  }
}
```

## Error Handling Example

```typescript
import { ValidationError, UnauthorizedError } from '../utils/ErrorHandler';

export class ProductController extends BaseController {
  protected async processRequest(req: Request): Promise<any> {
    try {
      // Your logic here
      if (!req.body.name) {
        throw new ValidationError('Product name is required');
      }
      // More implementation
    } catch (error) {
      throw error;
    }
  }
}
```

## Authentication Usage

```typescript
import { authenticateToken } from '../middleware/auth';

// In your router file:
router.get('/protected', authenticateToken, (req, res) => {
  // Your protected route logic
});
```
