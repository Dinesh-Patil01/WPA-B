import express from 'express';
import { addInteraction, getInteractions } from '../controllers/interactionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/:customerId').get(protect, getInteractions);
router.route('/').post(protect, addInteraction);

export default router;
