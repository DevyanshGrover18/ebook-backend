import Category from '../models/Category.js';

export const getAllCategories = async () => {
  return await Category.find({});
};

export const getCategoryById = async (id) => {
  return await Category.findOne({ id });
};

export const createCategory = async (categoryData) => {
  const data = {
    ...categoryData,
    href: `/books?category=${categoryData.id}`
  };
  const newCategory = new Category(data);
  return await newCategory.save();
};

export const updateCategory = async (id, categoryData) => {
  const data = { ...categoryData };
  if (categoryData.id) {
    data.href = `/books?category=${categoryData.id}`;
  }
  return await Category.findOneAndUpdate(
    { id },
    data,
    { new: true, runValidators: true }
  );
};

export const deleteCategory = async (id) => {
  return await Category.findOneAndDelete({ id });
};