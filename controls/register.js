const express = require('express');
const router = new express.Router();
const multer = require('multer'); // https://www.npmjs.com/package/multer
const User = require('./userschema.js');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 11;
// foto's opslaan in een map //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('./public/upload/'));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
router.post('/register', upload.single('file'), (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  const newuser = new User();
  newuser.name = req.body.name;
  newuser.age = req.body.age;
  newuser.sex = req.body.sex;
  newuser.email = req.body.email;
  newuser.password = hash;
  newuser.file = req.file ? ('/upload/' + req.file.filename) : null,


    newuser.save((err, savedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send;
      } else {
        console.log('Gelukt!');
        console.log(savedUser);
        req.session.user = savedUser;
        res.redirect(`/profile/${req.session.user._id}`);
      }
    });
});
router.get('/register', (req, res) => {
  res.render('pages/register');
});
module.exports = router;
