const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const arrayFind = require('array-find'); //https://www.npmjs.com/package/array-find
const mongo = require('mongodb'); //https://www.mongodb.com/
const mongoose = require('mongoose'); //https://www.npmjs.com/package/mongoose
const session = require('express-session') //https://www.npmjs.com/package/express-session
const validator = require('express-validator');
const cookie = require('cookie-parser');
const mongsess = require('mongo-session');
let user = require('./controls/userschema.js')

// ---- CMD-BT Slides MongoDB ---// 

var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, {
  useNewUrlParser: true
}, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    
  }
  db = client.db(process.env.DB_NAME)
})


router.get('/update', function(req, res, next){
  let item = {
    
  }
})