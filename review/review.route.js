import express from 'express';
const ReviewController = require('./review.controller');

const router = express.Router();

router.get('/getAllReviews', ReviewController.getAllReviews);
router.post('/createReview', ReviewController.createReview);

module.exports = router;
