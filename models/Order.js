import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true },
  image: { type: String },
  imageAlt: { type: String }
});

const orderSchema = new mongoose.Schema({
  customerInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, default: 'Digital delivery' },
    city: { type: String, default: 'N/A' },
    state: { type: String, default: 'N/A' },
    zipCode: { type: String, default: '000000' }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'Completed' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
