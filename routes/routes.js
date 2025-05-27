const express = require('express');
const rootRouter = express.Router();

const userRouter = require('./user.routes.js');
const bookRouter = require('./book.routes');
const reviewRouter = require('./review.routes');

rootRouter.use('/api/user',userRouter);
rootRouter.use('/api/role',bookRouter);
rootRouter.use('/api/book',reviewRouter);


module.exports = rootRouter;