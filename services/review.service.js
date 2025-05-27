const reviewRepository = require('../repository/review.repository');
class ReviewService{
  async updateReview(reviewID,updateReviewData){
    const reviewData = await reviewRepository.updateReview(reviewID,updateReviewData);
    if (!reviewData) {
      throw new Error('Review not found');
    }
    return reviewData;
  } 
  async deletedReview(reviewData){
    return await reviewRepository.deleteReview(reviewData.id);
  }  
}

module.exports = new ReviewService();