import express from 'express';
import * as bookController from '../controllers/bookController.js';

const router = express.Router();

// CRUD mappings for Books
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
