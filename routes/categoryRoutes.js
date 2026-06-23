import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import upload from '../utils/upload.js';

const router = express.Router();

// CRUD mappings for Categories
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', upload.single('image'), categoryController.createCategory);
router.put('/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
