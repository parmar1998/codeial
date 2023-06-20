
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../Models/users");

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
},
  async function (req, email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        req.flash('error', 'Invalid Username/Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      req.flash('error', err);
      return done(err);
    }
  }
)
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  console.log("userid=", user.id);
  done(null, user.id)
});

//desrializing the user from key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log('Error in finding user --> Passport');
    return done(err);
  }
});

//check if the user is authenticated - this function will be used as middle ware
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in,then pass on the request to the next function(controllers action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect('/users/sign-In')
}

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current sign in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user
  }
  next();
}

module.exports = passport;