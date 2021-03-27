const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (login_email, done) => {
    const user = getUserByEmail(login_email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    // try {
    //   if (await bcrypt.compare(password, user.password)) {
    //     return done(null, user)
    //   } else {
    //     return done(null, false, { message: 'Password incorrect' })
    //   }
    // } catch (e) {
    //   return done(e)
    // }
  }

  passport.use(new LocalStrategy({ usernameField: 'login_email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.uuid))
  passport.deserializeUser((uuid, done) => {
    return done(null, getUserById(uuid))
  })
}

module.exports = initialize