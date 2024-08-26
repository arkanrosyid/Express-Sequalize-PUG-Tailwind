const express = require('express');
const appRoutes = require('./src/routes/v1/index.js');
const createError = require('http-errors');
const errorHandler = require('./src/utils/errorHandler');
const app = express();
const db = require('./src/core/db.js');
const config = require('./src/core/config.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection test
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))


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

// error handler
app.use(errorHandler.errorHandler);



const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in ${config.ENVIRONMENT} mode on port ${PORT}`);
});

