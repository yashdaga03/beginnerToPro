import { Router } from 'express';
import { createOrder, verifyWebhookSignature } from '../controller/paymentController';

const router = Router();

router.post('/create-order', createOrder);
router.post('/webhook', verifyWebhookSignature);

export default router;