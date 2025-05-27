const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller.js');
const { authenticateToken } = require('../util/authentication.js');
router.patch('/:id',authenticateToken, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const updatedReview = await reviewController.updateReview(req.params.id, req.body);
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id',authenticateToken, async (req, res) => {
    try {
        await reviewController.deleteReview(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;