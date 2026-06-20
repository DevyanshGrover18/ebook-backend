import * as faqService from '../services/faqService.js';

export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await faqService.getAllFaqs();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving FAQs', error: error.message });
  }
};

export const getFaqById = async (req, res) => {
  try {
    const faq = await faqService.getFaqById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving FAQ', error: error.message });
  }
};

export const createFaq = async (req, res) => {
  try {
    const savedFaq = await faqService.createFaq(req.body);
    res.status(201).json(savedFaq);
  } catch (error) {
    res.status(400).json({ message: 'Error creating FAQ', error: error.message });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const updatedFaq = await faqService.updateFaq(req.params.id, req.body);
    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: 'Error updating FAQ', error: error.message });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const deletedFaq = await faqService.deleteFaq(req.params.id);
    if (!deletedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ message: 'FAQ deleted successfully', faq: deletedFaq });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
  }
};
