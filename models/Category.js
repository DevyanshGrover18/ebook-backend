import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  publicationsLabel: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true, default: 'Scale' },
  href: { type: String, required: true }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;