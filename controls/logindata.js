const express = require('express');
const router = new express.Router();
const User = require('../controls/userschema.js');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }, (err, currentUser) => {
    console.log(currentUser);
    console.log(req.body.password);
    const password = bcrypt.compareSync(req.body.password, currentUser.password);
    if (password === true) {
      console.log('correct');
      req.session.user = currentUser;
      res.redirect(`/profile/${req.session.user._id}`);
    } else {
      console.log('incorrect');
      res.status(401).send('Account wordt niet herkend');
    }
  });
});

router.get('/login', (req, res ) => {
  res.render('pages/login');
});


//
// router.post('/login', function(req, res, next) { // hulp van bas
//
//   const password = req.body.password;
//   const email = req.body.email;
//   db.user.find({
//     email:email
//   },
//
//   function done(err, user) {
//     if (!user) {
//       res.status(404).send('Email of wachtwoordt wordt niet herkend')
//     } else {
//       if(email === user.email){
//         res.redirect('/profile/' + user._id);
//         console.log('added session user')
//       }else{
//         res.status(401).send('Account wordt niet herkend')
//       }
//     }
//   })

// req.session.user = accounts[0].name;
// if(req.session.user) {
//   res.render('pages/login');
// } else {
//   res.redirect(401).send('Geen session!')
// }
// console.log(req.session);


module.exports = router;
