import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true },
  reviewer: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  body: { type: String, required: true },
  verified: { type: Boolean, default: false }
});

const chapterSchema = new mongoose.Schema({
  chapter: { type: Number, required: true },
  title: { type: String, required: true },
  pages: { type: String, required: true }
});

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  badge: { type: String, default: null },
  category: { type: String, required: true },
  publisher: { type: String, required: true },
  edition: { type: String, required: true },
  publicationDate: { type: String, required: true },
  pages: { type: Number, required: true },
  isbn: { type: String, required: true },
  language: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String },
  description: { type: String, required: true },
  keyFeatures: [{ type: String }],
  tableOfContents: [chapterSchema],
  reviews: [reviewSchema],
  relatedBookIds: [{ type: String }]
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
