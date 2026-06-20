import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

// Route mappings for Cart
router.get('/:cartId', cartController.getCart);
router.post('/:cartId/items', cartController.addItemToCart);
router.delete('/:cartId/items/:itemId', cartController.removeItemFromCart);
router.delete('/:cartId', cartController.clearCart);

export default router;
