const express = require('express'); // https://expressjs.com/
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); // https://www.npmjs.com/package/body-parser
const mongo = require('mongodb'); // https://www.mongodb.com/
const mongoose = require('mongoose'); // https://www.npmjs.com/package/mongoose
const session = require('express-session'); // https://www.npmjs.com/package/express-session


// routing van de pagina's //

app.get('/', index);
app.use(express.static('public'));
app.use(express.static('upload'));

// express engine //
app.set('view engine', 'ejs');
// session //
app.set('trust proxy', 1); // trust first proxy

app.use(session({
  secret: 'supergeheimedingen',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));

require('dotenv').config(); // gegeven voor de mongodb server
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+'memeaccount?retryWrites=true&w=majority', {useNewUrlParser: true});
db = mongoose.connection; // here i make a connection with mongodb my host, username and pw are in the .env file
db.once('open', () => {
  console.log('connected mongoose');
}); // check if we are connected to mongodb
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// controls gebruiken

const loginTest = require('./controls/logindata.js');
const addRegis = require('./controls/register.js');
const feed = require('./controls/feed.js');
const profile = require('./controls/profile.js');
const matchFeed = require('./controls/matchfeed.js');
const removeAccount = require('./controls/delete.js');
const updateAccount = require('./controls/update.js');

// pages use from routing //
app.use(loginTest);
app.use(addRegis);
app.use(profile);
app.use(feed);
app.use(matchFeed);
app.use(removeAccount);
app.use(updateAccount);


// --- index render---//

function index(req, res) {
  res.render('pages/index');
}
// //////////////////////////////////////////////////

app.use(errNotFound);
app.listen(port, servermsg);

function servermsg() {
  console.log('De server is geactiveerd!');
}

function errNotFound(req, res) {
  res.status(404).render('pages/404');
}
