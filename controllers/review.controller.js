const reviewService = require('../services/review.service');
class ReviewController {
  
  async updateReview(reviewID,updateReviewData) {
    if (!updateReviewData || !reviewID) {
      throw new Error('Invalid review data');
    }
    return reviewService.updateReview(reviewID,updateReviewData);
  }

  async deleteReview(reviewId) {
    if (!reviewId) {
      throw new Error('Invalid review ID');
    }
    return reviewService.deletedReview(reviewId );
  }
}

module.exports = new ReviewController();