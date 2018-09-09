const express               = require('express'),
      router                = express.Router(),
      mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const User                  = require('../models/user');

router.get('/', (req, res) => {
    res.send('TRYE');
});




module.exports = router;