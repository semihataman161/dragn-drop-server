const asyncHandler = require('express-async-handler');
const ReviewService = require('./review.service');

export const getAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await ReviewService.getAllReviews();
  return res.status(200).json({ data: reviews, message: 'Reviews fetched successfully.' });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const newReview = await ReviewService.createReview(req.body);
  return res.status(200).json({ data: newReview, message: 'Review created successfully.' });
});
