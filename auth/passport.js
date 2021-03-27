const passport = require('passport');
const knex = require('../database/cnx');

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.uuid);
  });

  passport.deserializeUser((uuid, done) => {
    knex.select().from('User_Login').where({uuid}).first()
    .then((user) => { 
      done(null, user)
      console.log('user seriliazer'); })
    .catch((err) => {
       done(err,null); });s
  });

};