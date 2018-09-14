const express = require('express'),
      router  = express.Router();


router.post('/add-question', (req, res) => {
    const question = req.body.question ;
});

module.exports = router ;