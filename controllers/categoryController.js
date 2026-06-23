import * as categoryService from '../services/categoryService.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving category', error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    let rawData = { ...req.body };
    if (req.file) {
      rawData.image = req.file.path;
    }
    const savedCategory = await categoryService.createCategory(rawData);
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    let rawData = { ...req.body };
    if (req.file) {
      rawData.image = req.file.path;
    }
    const updatedCategory = await categoryService.updateCategory(req.params.id, rawData);
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully', category: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
