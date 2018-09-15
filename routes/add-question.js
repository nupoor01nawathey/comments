const express = require('express'),
      router  = express.Router();

const Question = require('../models/question');

router.post('/add-question', isLoggedIn, (req, res) => {
    const ques = req.body.question ;
    const question = new Question({ question: ques, user: req.user });
    question.save((err, ques) => {
        if(err) {
            console.log(err);
            return res.redirect('/');
        }
        res.redirect('/user/profile');
    });
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/user/login");
}

module.exports = router ;