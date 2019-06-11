const express  = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb');

// routing van de pagina's //
app.use(express.static('public'));
app.set('view engine', 'ejs');


router.get('/', index);
router.get('/login', login);
router.get('/profile', ownProfile);
router.get('/matchprofile', matchProfile);
router.get('/list', listPage);
router.get('/register', register);
//--- pagina render---//

function index(req, res) {
  res.render('pages/index');
}

function register(req, res, next) {
  res.render('pages/register');
}

function login(req, res) {
  // req.session.user = accounts[0].name;
  // if(req.session.user) {
  //   res.render('pages/login');  
  // } else {
  //   res.redirect(401).send('Geen session!')
  // }
  // console.log(req.session);
    res.render('pages/login');  
  
}

function ownProfile(req, res) {
  res.render('pages/profile');
}
function matchProfile(req, res){
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

module.exports = router;