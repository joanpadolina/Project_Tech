const camelCase = require('camelcase'); // test package installed
const express = require('express'); //https://expressjs.com/
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv'); //https://www.npmjs.com/package/dotenv
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const arrayFind = require('array-find'); //https://www.npmjs.com/package/array-find
const mongo = require('mongodb'); //https://www.mongodb.com/
const mongoose = require('mongoose'); //https://www.npmjs.com/package/mongoose
const session = require('express-session') //https://www.npmjs.com/package/express-session
const validator = require('express-validator');
const cookie = require('cookie-parser');
const mongsess = require('mongo-session');
let user = require('./controls/userschema.js')

require('dotenv').config(); // gegeven voor de mongodb server



// ---- CMD-BT Slides MongoDB ---// 

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('yeh mongoose is on');
});

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


// controls gebruiken 
const loginTest = require('./controls/logindata.js');
const addRegis = require('./controls/register.js');



// express engine //
app.set('view engine', 'ejs');
// session //
app.set('trust proxy', 1) // trust first proxy
app.use(cookie());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(bodyParser.urlencoded({
  extended: true
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.

app.use((req, res, next) => {
  if (req.cookies.user && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});





// routing van de pagina's //

app.get('/', index);
app.use(express.static('public'));
app.use(loginTest);
app.use(addRegis);


app.get('/matchprofile', matchProfile);
app.get('/list', listPage);
app.get('/feed', feedList);
app.get('/register', register);
app.get('/login', login)
app.get('/edit', edit);
app.get('/matchprofile/:id', getMatch);
app.get('/profile/:id', findProfile);
app.get('/delete', deleteAccount);
app.get('/logout', logOut);

app.post('/edit', function(req, res, data){
  let name = req.body.id 
  let age = req.body.age 
  let id = req.params.id
  db.collection('account').update({},{
    name:req.body.name,
    age:req.body.age,
    email:req.body.email,
    password:req.body.password,
    file: req.file ? req.file.filename : null,
  });
  res.redirect('/profile/'+ data.insertedId);
  console.log('changes added');
});
app.post('/profile/:id', addRegis);
// leest de form en slaat het op in een js code
app.use(errNotFound);
app.listen(port, servermsg);


//--- pagina render---//

function index(req, res) {
  res.render('pages/index');
  //   if(req.session.page_views){
  //      req.session.page_views++;
  //      res.send("You visited this page " + req.session.page_views + " times");
  //   } else {
  //      req.session.page_views = 1;
  //      res.send("Welcome to this page for the first time!");
  //   }
}

function register(req, res, next) {
  res.render('pages/register');
}

function login(req, res) {
  res.render('pages/login');

}

function ownProfile(req, res) {
  // let id = slug(req.body.name).toLowerCase()
  // db.collection('account').findOne{
  // 
  // }
  res.render('pages/profile');
}

function edit(req, res, next){
  res.render('pages/editprofile')
}

function matchProfile(req, res) {
  res.render('pages/matchprofile')
}

function listPage(req, res) {
  res.render('pages/list');

}

function matchFeed(req, res) {
  res.render('pages/feed');
}


function dbCollect(req, res, next) { // require, response, alles tussen de req en res (middleware)
  db.collecction('account');
}


function redirectFeed(req, res, next) {
  res.render('matchprofile/' + data._id);
}

function logOut(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/');
      console.log('Je bent nu uitgelogd');
    }

  })

}
function findProfile(req, res, next) {
  let id = req.params.id
  db.collection('account').findOne({
    _id: new mongo.ObjectID(id)
  }, done)


  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('pages/profile', {
        data: data
      })
    }
  }
}

function deleteAccount(req, res, next){
  db.collection('account').removeOne({});
  console.log('account gewist');
  res.redirect('/');
}

// session try not working keeps redirecting
// function getMatch(req, res, next) {
//   if (!req.session.user) {
//     res.render('pages/login');
//   }
//   db.collection('account').findOne( done);
//   function done(err, data){
//     res.redirect('matchprofile', {
//       title:'Matches',
//       user: req.session.user,
//       data:data
//     })
//   }
// } 

function getMatch(req, res, next) {
  let id = req.params.id
  db.collection('account').findOne({
    _id: new mongo.ObjectID(id)
  }, done)

  function done(err, data) {
  if (err) {
        next(err)
      } else {
        res.render('pages/matchprofile', {
          data: data,
          user : req.session.user
        })
      }    
  }
}


function feedList(req, res, next) {
  db.collection("account").find().toArray(function(err, data) {
    res.render('pages/feed', {
      data: data
    });
    // res.render(data);
    console.log(req.session);
  });
}






////////////////////////////////////////////////////

function servermsg() {
  console.log('De server is geactiveerd!');
}

function errNotFound(req, res) {
  res.status(404).render('pages/404');
}