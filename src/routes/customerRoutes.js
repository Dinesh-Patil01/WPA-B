import express from 'express';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.route('/').get(protect, checkRole('Admin'), getCustomers);
router.route('/:id').put(protect, checkRole('Admin'), updateCustomer).delete(protect, checkRole('Admin'), deleteCustomer);

export default router;



