'use strict';

module.exports = {
  facebookAuth: {
    
  },
  twitterAuth: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://localhost:9000/api/twitter/callback'
  },
  googleAuth: {
    
  }
};