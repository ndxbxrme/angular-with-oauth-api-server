'use strict';

module.exports = function(app, passport) {
  app.get('/api', isLoggedIn, function(req, res) {
    res.send('glad you made it');
  });
  
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/api',
    failureRedirect: '/api',
    failureFlash: true
  }));
  
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/api',
    failureRedirect: '/api',
    failureFlash: true
  }));
  
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next(); 
    }
    res.status(401).send('not logged in');
  }
};