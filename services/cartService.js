import Cart from '../models/Cart.js';

export const getCart = async (cartId) => {
  return await Cart.findOne({ cartId });
};

export const addItemToCart = async (cartId, item) => {
  let cart = await Cart.findOne({ cartId });
  if (!cart) {
    cart = new Cart({ cartId, items: [] });
  }

  // Check if the item already exists in the cart (to prevent duplicates in digital ebooks)
  const exists = cart.items.some((i) => i.id === item.id);
  if (exists) {
    throw new Error('Item already exists in cart');
  }

  cart.items.push(item);
  return await cart.save();
};

export const removeItemFromCart = async (cartId, itemId) => {
  const cart = await Cart.findOne({ cartId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((item) => item.id !== itemId);
  return await cart.save();
};

export const clearCart = async (cartId) => {
  const cart = await Cart.findOne({ cartId });
  if (cart) {
    cart.items = [];
    return await cart.save();
  }
  return { cartId, items: [] };
};
