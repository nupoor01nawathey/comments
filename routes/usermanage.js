const express                   = require('express'),
      router                    = express.Router(),
      passport                  = require('passport');
      // validationResult          = require('express-validator');

const User                      = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register') //, {title: 'Form Validation', success: req.session.session, errors: req.session.errors });
});

router.post('/register', (req, res) => {
    const username = req.body.username,
          password = req.body.password;

    // req.check('username', 'username must be an email').isEmail().isLength({min: 10});
    // req.check('password', 'password must be minimum of 4 characters').isLength({min: 4}); //equals(req.body.confirmPassword)

    // const errors = req.validationErrors();
    // if(errors) {
    //     req.session.errors  = errors;
    //     req.session.success = false; 
    // } else {
    //     req.session.success = true ;
    // }
    // res.redirect('/user/register');

    User.register(new User({username: username}), password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect('/user/login');
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate("local" , {
    successRedirect: '/user/profile',
    failureRedirect: '/user/register'
}));


router.get('/profile', (req, res) => {
    //res.send('welcome to profile section');
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
});

module.exports = router;