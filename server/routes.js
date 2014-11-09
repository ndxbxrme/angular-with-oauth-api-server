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
 
  app.get('/api/twitter', passport.authenticate('twitter'));
  
  app.get('/api/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));
  
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next(); 
    }
    res.status(401).send('not logged in');
  }
};