const router = require('express').Router();
// const userController = require('../../controllers/userController');
const loginController = require('../../controllers/auth/loginController');

// login route
router.post('/login', loginController.login);


module.exports = router;