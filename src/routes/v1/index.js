const router = require("express").Router();


// routes view
router.use('/', require('./viewRoute'));

// api routes
// router.use('/api/users', require('./userRoutes'));

module.exports = router;