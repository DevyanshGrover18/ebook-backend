import Order from '../models/Order.js';

const VALID_DATE_RANGES = new Set(['7d', '30d', 'all']);
const DATE_RANGE_DAYS = {
  '7d': 7,
  '30d': 30,
};

export const normalizeDateRange = (dateRange = '7d') => (
  VALID_DATE_RANGES.has(dateRange) ? dateRange : '7d'
);

export const createOrder = async (orderData) => {
  const newOrder = new Order(orderData);
  return await newOrder.save();
};

export const getAllOrders = async (page = 1, limit = 10, dateRange = '7d') => {
  const validLimits = [10, 50, 100];
  const size = validLimits.includes(limit) ? limit : 10;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const normalizedDateRange = normalizeDateRange(dateRange);

  const filter = {};
  const days = DATE_RANGE_DAYS[normalizedDateRange];
  if (normalizedDateRange !== 'all' && days) {
    const from = new Date();
    from.setDate(from.getDate() - days);
    filter.createdAt = { $gte: from };
  }

  const skip = (pageNum - 1) * size;
  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size);

  return {
    orders,
    total,
    pages: Math.max(1, Math.ceil(total / size)),
    currentPage: pageNum,
    limit: size,
    dateRange: normalizedDateRange
  };
};

export const getOrderById = async (id) => {
  return await Order.findById(id);
};
