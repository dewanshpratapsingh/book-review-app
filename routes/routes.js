const express = require('express');
const rootRouter = express.Router();

const userRouter = require('./user.routes.js');
const bookRouter = require('./book.routes');
const reviewRouter = require('./review.routes');
const searchRouter = require('./search.routes.js');

rootRouter.use('/user',userRouter);
rootRouter.use('/review',reviewRouter);
rootRouter.use('/book', bookRouter);
rootRouter.use('/search',searchRouter);


module.exports = rootRouter;