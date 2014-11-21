'use strict';

module.exports = function(app, passport) {
  app.get('/api/user', isLoggedIn, function(req, res) {
    res.json(req.user);
  });
  
  //LOGIN AUTHENTICATE/FIRST SIGNUP
  
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/api/user',
    failureRedirect: '/api/user',
    failureFlash: true
  }));
  
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/api/user',
    failureRedirect: '/api/user',
    failureFlash: true
  }));
 
  app.get('/api/twitter', passport.authenticate('twitter', {scope:'email'}));
  
  app.get('/api/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  
  app.get('/api/facebook', passport.authenticate('facebook', {scope:'email'}));
  
  app.get('/api/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  
  app.get('/api/github', passport.authenticate('github', {scope:['user','user:email']}));
  
  app.get('/api/github/callback', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  
  app.get('/api/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  
  app.get('/api/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  
  //LOGIN CONNECT ACCOUNTS
  app.get('/api/connect/local', function(req, res) {
    //send flash message
  });
  app.post('/api/connect/local', passport.authorize('local-signup', {
    successRedirect: '/api/user',
    failureRedirect: '/api/user',
    failureFlash: true
  }));
  
  app.get('/api/connect/twitter', passport.authorize('twitter', {scope:'email'}));
  app.get('/api/connect/facebook', passport.authorize('facebook', {scope:'email'}));
  app.get('/api/connect/github', passport.authorize('github', {scope:['user','user:email']}));
  app.get('/api/connect/google', passport.authorize('google', {scope:['profile', 'email']}));
  
  //UNLINK ACCOUNTS
  app.get('/api/unlink/local', function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err){
      res.redirect('api/user');
    });
  });
  
  app.get('/api/unlink/twitter', function(req, res) {
    var user = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
   app.get('/api/unlink/facebook', function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
  app.get('/api/unlink/github', function(req, res) {
    var user = req.user;
    user.github.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
  app.get('/api/unlink/google', function(req, res){
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err){
      res.redirect('/profile');
    });
  });
  
  app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/api/user');
  });
  
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next(); 
    }
    res.status(401).send(req.flash('loginMessage'));
  }
};