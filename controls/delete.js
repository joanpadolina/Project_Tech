const express = require('express');
const router = new express.Router();
const User = require('./userschema');

router.get('/delete', (req, res) => {
    console.log('running');
    const id = req.session.user._id;
    User.deleteOne({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            console.log('User removed');
            res.status(200).send();
            res.redirect('/login');
        }
    });
});

module.exports = router;
