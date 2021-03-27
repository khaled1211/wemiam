const express = require('express');
const app=express();
const apiRoute=require('./database/routes');
const session = require('express-session');  
const bodyParser = require('body-parser');
const passport = require('passport');
var cookieParser = require('cookie-parser')
var LocalStrategy = require('passport-local').Strategy;
const db = require('./database/cnx');
const bcrypt = require('bcryptjs');
const authHelpers = require('./database/helpers.js');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));




app.use(bodyParser.urlencoded({ extended: false }));


 
// uncomment if using express-session

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true
}));


// Initializing passport

app.use(passport.initialize());
app.use(passport.session());
//  passport.deserializeUser(function(id, done){
//   db.select().from('User_Login').where({uuid:req.params.uuid}).then(function(data){
//    res.send(data)
//    });
// // });
// // configure passport.js to use the local strategy
// passport.use(new LocalStrategy(
//   { usernameField: 'login_email',
//   passwordField: 'login_password'  },
//   (login_email, login_password, done) => {
//     // here is where you make a call to the database
//     // to find the user based on their username or email address
//     // for now, we'll just pretend we found that it was users[0]
    
//     if(login_email === req.body.login_email && login_password ===req.body.login_password) {
//       console.log('Local strategy returned true')
//       return done(null, user)
//     }
//   }
// ));

// // tell passport how to serialize the user

// configure passport.js to use the local strategy
// passport.use(new LocalStrategy(
//   { usernameField: 'login_email' ,passwordField: 'login_password'},
//   (login_email, login_password, done) => {
//     console.log('Inside local strategy callback')
//     // here is where you make a call to the database
//     // to find the user based on their username or email address
//     // for now, we'll just pretend we found that it was users[0]
//     const user =  db.select().from('User_Login').then(function(data){

//     if(req.body.login_email === user.login_email && req.body.login_password === user.login_password) {
//       console.log('Local strategy returned true')
//       return done(null, user)
//     }
//   }
//)}));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id);
});





app.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login', async (req, res, next) => {
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
app.use('/',apiRoute);
app.listen(3001, () => console.log('Server started at port : 3001'))

