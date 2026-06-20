import Book from '../models/Book.js';

export const getAllBooks = async () => {
  return await Book.find({});
};

export const getBookById = async (id) => {
  return await Book.findOne({ id });
};

export const createBook = async (bookData) => {
  const newBook = new Book(bookData);
  return await newBook.save();
};

export const updateBook = async (id, bookData) => {
  return await Book.findOneAndUpdate(
    { id },
    bookData,
    { new: true, runValidators: true }
  );
};

export const deleteBook = async (id) => {
  return await Book.findOneAndDelete({ id });
};
