const bcrypt = require('bcryptjs');
const express = require('express');
const app=express();

var Authenticate = function (req, res, next) {

  if (req.isAuthenticated()) {

    return next();

  } else {

    res.sendStatus(401);

  }

};
function comparePass(userPassword,login_password) {
  return bcrypt.compareSync(userPassword,login_password);
}

module.exports = {
  comparePass
};