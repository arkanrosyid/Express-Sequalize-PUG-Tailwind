const router = require('express').Router();
const loginController = require('../../controllers/auth/loginController');

// Home page route
router.get('/',loginController.index);   
// dashboard route
router.get('/dashboard', async (req, res) => {
    res,render('dashboard', {
        title: 'Dashboard'
    });
});

module.exports = router;