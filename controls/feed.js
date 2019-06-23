const express = require('express');
const router = new express.Router();
const User = require('./userschema.js');


router.get('/feed', (req, res, next) => {
  User.find({}, function(err, data) {
    const userMap = {};
data.forEach((user) => {
  userMap[user._id]= user;
});
    res.render('pages/feed', {
      data: data,
    });
    // res.render(data);
    console.log(req.session);
  });
}
);


module.exports = router;
