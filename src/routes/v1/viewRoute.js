const router = require('express').Router();
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Login',
    });
});   

module.exports = router;