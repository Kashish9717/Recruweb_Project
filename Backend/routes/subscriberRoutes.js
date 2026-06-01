import express from 'express';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/subscriberController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', subscribe);
router.get('/unsubscribe/:email', unsubscribe);
router.get('/', protect, getSubscribers);

export default router;
