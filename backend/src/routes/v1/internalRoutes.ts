import { Router } from 'express';
import * as clientController from '@/api/v1/internal/client/controller';
import * as clientDetailController from '@/api/v1/internal/client/detail/controller';

const router = Router();

// Client routes - /api/v1/internal/client
router.get('/client', clientController.getHandler);
router.post('/client', clientController.postHandler);
router.get('/client/:id', clientDetailController.getHandler);
router.put('/client/:id', clientDetailController.putHandler);
router.delete('/client/:id', clientDetailController.deleteHandler);

export default router;
