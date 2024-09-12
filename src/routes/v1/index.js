const router = require("express").Router();


// routes view
router.use('/', require('./viewRoute'));
router.use('/auth', require('./authRoute'));

// api routes
// router.use('/users', require('./userRoutes'));

module.exports = router;