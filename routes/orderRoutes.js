import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/razorpay/create', orderController.createRazorpayOrder);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);

export default router;
