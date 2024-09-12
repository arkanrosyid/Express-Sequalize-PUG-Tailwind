const express = require('express');
const appRoutes = require('./src/routes/v1/index.js');
const createError = require('http-errors');
const errorHandler = require('./src/utils/errorHandler');
const app = express();
const db = require('./src/core/db/db.js');
const config = require('./src/core/config.js');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSRF protection
const csrfProtection = csrf({cookie: {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
}});

app.use(csrfProtection);

// security headers
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains');
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Expect-CT", "max-age=86400, enforce");
  res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  next();
});



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

