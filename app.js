const express = require('express');
const app = express();
const rootRouter = require('./routes/routes');
/**To parser JSON and FORM data in request body */
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/',rootRouter);

app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        status: 500
    });
    res.end();
});
  
export default app;