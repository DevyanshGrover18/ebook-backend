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

function transformContentsData(data) {
  if (data.contents && Array.isArray(data.contents)) {
    data.tableOfContents = data.contents.map((item, index) => ({
      chapter: index + 1,
      title: item.topic,
      pages: `${item.startPage}\u2013${item.endPage}`,
    }));
    delete data.contents;
  }
  return data;
}

export const createBook = async (req, res) => {
  try {
    let rawData = { ...req.body };
    if (typeof rawData.keyFeatures === 'string') {
      try { rawData.keyFeatures = JSON.parse(rawData.keyFeatures); } catch (e) {}
    }
    if (typeof rawData.contents === 'string') {
      try { rawData.contents = JSON.parse(rawData.contents); } catch (e) {}
    }
    if (typeof rawData.existingImages === 'string') {
      try { rawData.images = JSON.parse(rawData.existingImages); delete rawData.existingImages; } catch (e) {}
    }

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        rawData.image = req.files.image[0].path;
      }
      if (req.files.images && req.files.images.length > 0) {
        rawData.images = [...(rawData.images || []), ...req.files.images.map(f => f.path)];
      }
    }

    const transformedData = transformContentsData(rawData);
    const savedBook = await bookService.createBook(transformedData);
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    let rawData = { ...req.body };
    if (typeof rawData.keyFeatures === 'string') {
      try { rawData.keyFeatures = JSON.parse(rawData.keyFeatures); } catch (e) {}
    }
    if (typeof rawData.contents === 'string') {
      try { rawData.contents = JSON.parse(rawData.contents); } catch (e) {}
    }
    if (typeof rawData.existingImages === 'string') {
      try { rawData.images = JSON.parse(rawData.existingImages); delete rawData.existingImages; } catch (e) {}
    }

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        rawData.image = req.files.image[0].path;
      }
      if (req.files.images && req.files.images.length > 0) {
        rawData.images = [...(rawData.images || []), ...req.files.images.map(f => f.path)];
      }
    }

    const transformedData = transformContentsData(rawData);
    const updatedBook = await bookService.updateBook(req.params.id, transformedData);
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
