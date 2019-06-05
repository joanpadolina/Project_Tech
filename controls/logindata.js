const express  = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb'); //https://www.mongodb.com/

// ---- CMD-BT Slides MongoDB ---//

var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, {
  useNewUrlParser: true
}, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('You now have access to ' + url);
  }
  db = client.db(process.env.DB_NAME)
})

router.post('/login', function(req, res, next) { // hulp van bas
  
  const password = req.body.password;
  const email = req.body.email;
  db.collection('account').findOne({
    email: req.body.email,
    password: req.body.password
  }, done);

  function done(err, data) {
    if (!data) {
      res.status(404).send('Email of wachtwoordt wordt niet herkend')
    } else {
      if(email === data.email){
        res.redirect('/profile/' + data._id);
      }else{
        res.status(401).send('Account wordt niet herkend')
      }
      req.session.save
    }
  }
  console.log(req.session)
  // req.session.user = accounts[0].name;
  // if(req.session.user) {
  //   res.render('pages/login');  
  // } else {
  //   res.redirect(401).send('Geen session!')
  // }
  // console.log(req.session);
}
)

module.exports=router;