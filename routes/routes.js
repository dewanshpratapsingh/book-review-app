const express = require('express');
const rootRouter = express.Router();

const userRouter = require('./user.routes.js');
const bookRouter = require('./book.routes');
const reviewRouter = require('./review.routes');

rootRouter.use('/api/user',userRouter);
rootRouter.use('/api/role',bookRouter);
rootRouter.use('/api/book',reviewRouter);
rootRouter.use('/api', (req, res) => {
  res.status(404).json({
    message: 'API endpoint not found',
    status: 404
  });
});


module.exports = rootRouter;