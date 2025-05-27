const express = require('express');
const router = express.Router();
const bookController = require('./../controllers/book.controller.js');
const { authenticateToken } = require('../util/authentication.js');
router.get('/', async (req, res) => {
    try {
        let author = req.query.author || null;
        let genre = req.query.genre || null;
        let page = parseInt(req.query.page) || 1;
        const books = await bookController.getAllBooks(author, genre,page);
        if (!books || books.length === 0){
            return res.status(200).json({ message: 'No books found' });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await bookController.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', authenticateToken,async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const newBook = await bookController.addBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:id/reviews',authenticateToken, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const reviews = await bookController.addReviewForBookById(req.params.id,req.body);
        if (!reviews) {
            return res.status(404).json({ message: 'Reviews not found for this book' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;