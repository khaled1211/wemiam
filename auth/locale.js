const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authHelpers = require('../database/helpers.js');

const init = require('./passport');
const knex = require('../database/cnx.js');

const options = { };

init();

passport.use(new LocalStrategy({
  usernameField: 'login_email',
  passwordField: 'login_password'
},(async function(username, password, next)  {
    // check to see if the username exists
   
     try {
       const {login_email, login_password} = req.body
       const user = await db('User_Login').first('*').where({login_email})
       if (!user) {
         console.log('No such user found:', req.body.login_email)
         res.status(401).send('Wrong login_email')
       } else {
        
         req.session.user = user
  
         const exist = await db('User_Login').first('*').where({login_password})
         const BCRYPT_SALT_ROUNDS=12;
  
         //const validPass = await bcrypt.compareSync(login_password, user.)
         const hash = bcrypt.hashSync(user.login_password, BCRYPT_SALT_ROUNDS);
       
  
        const validPass = await bcrypt.compareSync(req.body.login_password,user.login_password)
        console.log(user.login_email)
         if (validPass) {
         
           req.session.user = user
           res.json(user)
           console.log('login success')
         } else {
           console.log('Incorrect password for user:', login_email)
           res.status(401).send('Wrong password')
         }
       }
     } catch (err) {
       next(err)
     }
  })
  
     
));
    




module.exports = passport;