import BookRequestService from '../services/bookRequestService.js';

const BookRequestController = {
  /* POST /api/book-requests */
  async create(req, res) {
    try {
      const { title, author, isbn, publisher, reason } = req.body;

      // Cloudinary populates req.file.path (URL) and req.file.filename (public_id)
      const imageUrl = req.file?.path ?? null;
      const imagePublicId = req.file?.filename ?? null;

      const data = await BookRequestService.createRequest({
        title, author, isbn, publisher, reason, imageUrl, imagePublicId,
      });

      return res.status(201).json({ success: true, data });
    } catch (err) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
  },

  /* GET /api/book-requests */
  async list(req, res) {
    try {
      const { status, page, limit } = req.query;
      const result = await BookRequestService.listRequests({ status, page, limit });
      return res.json(result);
    } catch (err) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
  },

  /* GET /api/book-requests/:id */
  async getOne(req, res) {
    try {
      const data = await BookRequestService.getRequest(req.params.id);
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
  },

  /* PATCH /api/book-requests/:id/status */
  async updateStatus(req, res) {
    try {
      const data = await BookRequestService.updateStatus(req.params.id, req.body.status);
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
  },

  /* DELETE /api/book-requests/:id */
  async remove(req, res) {
    try {
      await BookRequestService.deleteRequest(req.params.id);
      return res.json({ success: true, message: 'Request deleted.' });
    } catch (err) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
  },
};

export default BookRequestController;