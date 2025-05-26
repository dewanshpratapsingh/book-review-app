const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search.controller.js');


router.get('/',async ( req, res) => {
    try {
        const results = await searchController.search(req.query.q);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;