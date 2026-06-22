import express from 'express';
import * as bookController from '../controllers/bookController.js';
import upload from '../utils/upload.js';

const router = express.Router();

// CRUD mappings for Books
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), bookController.createBook);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
