import Faq from '../models/Faq.js';

export const getAllFaqs = async () => {
  return await Faq.find({});
};

export const getFaqById = async (id) => {
  return await Faq.findOne({ id });
};

export const createFaq = async (faqData) => {
  const newFaq = new Faq(faqData);
  return await newFaq.save();
};

export const updateFaq = async (id, faqData) => {
  return await Faq.findOneAndUpdate(
    { id },
    faqData,
    { new: true, runValidators: true }
  );
};

export const deleteFaq = async (id) => {
  return await Faq.findOneAndDelete({ id });
};
