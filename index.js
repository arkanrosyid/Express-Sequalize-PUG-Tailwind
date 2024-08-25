const express = require('express');
const appRoutes = require('./src/routes/v1/index.js');
const dotenv = require('dotenv');
const createError = require('http-errors');
const path = require('path');



const envFilePath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';dotenv.config({ path: envFilePath });
const errorHandler = require('./src/utils/errorHandler');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set pug as view engine
app.set('view engine', 'pug');
app.set('views', './src/views');

// set static public folder
app.use(express.static('public'));

// using routes
app.use("/", appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
app.use(errorHandler.errorHandler);
// log all requests



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

