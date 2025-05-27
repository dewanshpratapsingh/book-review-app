const Review = require('../models/review.model.js');
const mongoose = require('mongoose');
class ReviewRepository{
    async updateReview(reviewID,reviewUpdateData) {
        const updatedReview = await Review.findByIdAndUpdate(
            {_id : new mongoose.Types.ObjectId(reviewID),deleted : false},
            { $set: reviewUpdateData },
            { new: true, runValidators: true }
        );
        if (!updatedReview) {
            throw new Error('Review not found');
        }
        if(updatedReview.modifiedCount === 0) {
            throw new Error('No changes made to the review');
        }
        return updatedReview;
    }
    async deleteReview(reviewId) {
        const deletedReview = await Review.findByIdAndUpdate(
            {_id : new mongoose.Types.ObjectId(reviewId),deleted : false},
            { $set: { deleted: true } },
            { new: true, runValidators: true }
        );
        if (!deletedReview) {
            throw new Error('Review not found');
        }
        return deletedReview;
    }
}

module.exports = new ReviewRepository();