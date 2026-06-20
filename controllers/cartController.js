import * as cartService from '../services/cartService.js';

export const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await cartService.getCart(cartId);
    if (!cart) {
      return res.json({ cartId, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const item = req.body;

    if (!item.id || !item.title || !item.price) {
      return res.status(400).json({ message: 'Missing required item fields (id, title, price)' });
    }

    const updatedCart = await cartService.addItemToCart(cartId, item);
    res.status(201).json(updatedCart);
  } catch (error) {
    if (error.message === 'Item already exists in cart') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const updatedCart = await cartService.removeItemFromCart(cartId, itemId);
    res.json(updatedCart);
  } catch (error) {
    if (error.message === 'Cart not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const clearedCart = await cartService.clearCart(cartId);
    res.json({ message: 'Cart cleared successfully', cartId, items: clearedCart.items || [] });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};
