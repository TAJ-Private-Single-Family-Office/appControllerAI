import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { ExampleController } from '../controllers/ExampleController';

const router = Router();
const exampleController = new ExampleController();

router.get('/example', authenticateToken, (req, res) => exampleController.execute(req, res));
router.post('/example', authenticateToken, (req, res) => exampleController.execute(req, res));

export default router;
