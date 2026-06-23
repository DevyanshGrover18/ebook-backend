import BookRequest from '../models/BookRequest.js';

const VALID_STATUSES = ['pending', 'sourcing', 'fulfilled', 'declined'];

const BookRequestService = {
  async createRequest({ title, author, isbn, publisher, reason, imageUrl, imagePublicId }) {
    if (!title?.trim()) {
      throw Object.assign(new Error('Book title is required.'), { status: 400 });
    }

    return BookRequest.create({
      title: title.trim(),
      author: author?.trim() || null,
      isbn: isbn?.trim() || null,
      publisher: publisher?.trim() || null,
      reason: reason?.trim() || null,
      image: {
        url: imageUrl ?? null,
        publicId: imagePublicId ?? null,
      },
    });
  },

  async listRequests({ status, page = 1, limit = 20 } = {}) {
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      BookRequest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      BookRequest.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    };
  },

  async getRequest(id) {
    const doc = await BookRequest.findById(id).lean();
    if (!doc) throw Object.assign(new Error('Book request not found.'), { status: 404 });
    return doc;
  },

  async updateStatus(id, status) {
    if (!VALID_STATUSES.includes(status)) {
      throw Object.assign(
        new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`),
        { status: 400 }
      );
    }

    const doc = await BookRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).lean();

    if (!doc) throw Object.assign(new Error('Book request not found.'), { status: 404 });
    return doc;
  },

  async deleteRequest(id) {
    const doc = await BookRequest.findByIdAndDelete(id).lean();
    if (!doc) throw Object.assign(new Error('Book request not found.'), { status: 404 });
    return doc;
  },
};

export default BookRequestService;