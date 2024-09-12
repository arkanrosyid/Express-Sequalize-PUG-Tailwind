const {User} = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_EXPIRATION_DURATION , JWT_KEY} = require('../../core/config');
const cookieParser = require('cookie-parser');

exports.index = async (req, res, next) => {
    if(!req.error) {
        res.render('home', {
            title: 'Login',
            csrfToken : req.csrfToken(),
        });
    } else {
        res.render('home', {
            title: 'Login',
            csrfToken : req.csrfToken(),
            error: req.error
        });
    }
    
  
}
checkRememberToken = (req, res, next) => {
    if (req.cookies.rememberToken) {
        const rememberToken = req.cookies.rememberToken;
        const user = jwt.verify(rememberToken, JWT_KEY);
        req.user = user;
    }
    next();
}
exports.login = async (req, res, next) => {
   
    
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user) {
            throw {statusCode: 404, message: 'User not found'};
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            throw {statusCode: 401, message: 'Invalid password'};
        } 

        const accessToken = jwt.sign({email: user.email, role: user.role, piket : user.piket}, JWT_KEY, {expiresIn: ACCESS_TOKEN_EXPIRATION_DURATION});
        res.cookie('loggedIn', true, {httpOnly: true, secure: true, sameSite: 'strict'});
        res.cookie('token', accessToken({httpOnly: true, secure: true, sameSite: 'strict'}));

        res.redirect('/dashboard');

    } catch (error) {
        req.error = error;
        console.log(req.error);
        res.redirect('/');
        
    }
};