const mongoose = require('mongoose');

console.log('----------- userSchema added ----------------');

mongoose.connect('mongodb://localhost/Project_Tech', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  state: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  file: {
    type: String,
  },
});

const user = mongoose.model('account', userSchema);
module.exports = user;
