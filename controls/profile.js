const express = require('express');
const router = new express.Router();
const User = require('./userschema');

router.get('/profile/:id', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    User.findOne({_id: req.params.id}, (err, profile) => {
        if (err) {
            throw (err);
        } else {
            res.render('pages/profile', {data: profile, user: req.session.user});
        }
    });
});

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    res.redirect(`/profile/${req.session.user._id}`);
});

module.exports = router;

