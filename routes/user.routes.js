const express = require('express');
const router  = express.Router();
const userController = require('../controllers/user.controller.js');

router.post('/signup', async (req,res)=>{
    try {
        const user = await userController.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const token = await userController.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;