const express = require('express');
const router = express.Router();


const bookController = require('../controllers/book.controller.js');
router.get('/', async (req, res) => {
    try {
        const books = await bookController.getAllBooks();
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


router.post('/', async (req, res) => {
    try {
        const newBook = await bookController.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:id/reviews', async (req, res) => {
    try {
        const reviews = await bookController.postReviewForBook(req.params.id);
        if (!reviews) {
            return res.status(404).json({ message: 'Reviews not found for this book' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});