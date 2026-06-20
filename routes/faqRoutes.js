import express from 'express';
import * as faqController from '../controllers/faqController.js';

const router = express.Router();

// CRUD mappings for FAQs
router.get('/', faqController.getAllFaqs);
router.get('/:id', faqController.getFaqById);
router.post('/', faqController.createFaq);
router.put('/:id', faqController.updateFaq);
router.delete('/:id', faqController.deleteFaq);

export default router;
