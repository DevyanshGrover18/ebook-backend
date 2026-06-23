import mongoose from 'mongoose';

const bookRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required.'],
      trim: true,
      maxlength: [500, 'Title cannot exceed 500 characters.'],
    },
    author: {
      type: String,
      trim: true,
      default: null,
    },
    isbn: {
      type: String,
      trim: true,
      default: null,
    },
    publisher: {
      type: String,
      trim: true,
      default: null,
    },
    reason: {
      type: String,
      trim: true,
      default: null,
    },
    image: {
      url: { type: String, default: null },        // Cloudinary secure URL
      publicId: { type: String, default: null },   // Cloudinary public_id
    },
    status: {
      type: String,
      enum: ['pending', 'sourcing', 'fulfilled', 'declined'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

bookRequestSchema.index({ status: 1, createdAt: -1 });

const BookRequest = mongoose.model('BookRequest', bookRequestSchema);

export default BookRequest;