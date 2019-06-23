const express = require('express');
const router = new express.Router();
const User = require('./userschema');

router.get('/matchprofile/:id', (req, res, next) => {
  User.findOne({
    _id: req.params.id,
  }, done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('pages/matchprofile', {
        data: data,
        user: req.session.user,
      });
    }
  }
});

module.exports = router;
