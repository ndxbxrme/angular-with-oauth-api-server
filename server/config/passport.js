var LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    User = require('../models/user'),
    configAuth = require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  //LOCAL
  
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({'local.email': email}, function(err, user){
        if(err) {
          return done(err); 
        }
        if(user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.')); 
        }
        else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err){
            if(err) {
              throw err; 
            }
            return done(null, newUser);
          });
        }
      });
    }); 
  }));
  
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    User.findOne({'local.email':email}, function(err, user){
      if(err) {
        return done(err); 
      }
      if(!user) {
        return done(null, false, req.flash('loginMessage', 'No user found')); 
      }
      if(!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong password')); 
      }
      return done(null, user);
    });
  }));
  
  //TWITTER
  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  }, function(token, tokenSecret, profile, done){
    process.nextTick(function(){
      User.findOne({ 'twitter.id': profile.id}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, user); 
        }
        else {
          var newUser = new User();
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;
          newUser.save(function(err){
            if(err) {
              throw err; 
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
};