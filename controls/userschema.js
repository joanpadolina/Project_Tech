const mongoose = require('mongoose');
const express = require('express');

console.log('----------- userSchema added ----------------')
const userSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true
  },
  password:{
    type: String,
    unique: true
  }
}) 

let user = mongoose.model('account', userSchema);
module.exports = user;
