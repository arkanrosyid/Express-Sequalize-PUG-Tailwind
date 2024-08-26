const router = require('express').Router();

// Home page route
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Login',
    });
});   

module.exports = router;