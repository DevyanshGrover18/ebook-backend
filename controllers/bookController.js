import * as bookService from '../services/bookService.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book', error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const savedBook = await bookService.createBook(req.body);
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookService.deleteBook(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};
