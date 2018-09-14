const express               = require('express'),
      router                = express.Router(),
      passport              = require('passport');

const User                  = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const username = req.body.username,
          password = req.body.password;

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

router.post('/add-question', (req, res) => {
    console.log(`>>>> ${res.body}`);
});


module.exports = router;