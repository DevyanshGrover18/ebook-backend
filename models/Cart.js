import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // cart-book-1, cart-book-2, etc. or a real book id
  title: { type: String, required: true },
  author: { type: String, required: true },
  format: { type: String, default: 'Digital Edition' },
  price: { type: Number, required: true },
  fileSizeMB: { type: Number, default: 0 },
  image: { type: String, required: true },
  imageAlt: { type: String }
});

const cartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },
  items: [cartItemSchema]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
