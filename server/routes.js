'use strict';

module.exports = function(app, passport) {
  app.get('/api/user', isLoggedIn, function(req, res) {
    res.json(req.user);
  });
  
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
  
  app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/api/user');
  });
  
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next(); 
    }
    res.status(401).send('not logged in');
  }
};