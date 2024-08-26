const router = require("express").Router();


// routes view
router.use('/', require('./viewRoute'));
router.use('/api', require('./userRoute'));

// api routes
// router.use('/users', require('./userRoutes'));

module.exports = router;