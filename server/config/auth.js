'use strict';

module.exports = {
  facebookAuth: {
    clientID: process.env.FACEBOOK_KEY,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'http://localhost:9000/api/facebook/callback'
  },
  twitterAuth: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://localhost:9000/api/twitter/callback'
  },
  googleAuth: {
    clientID: process.env.GOOGLE_KEY,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:9000/api/google/callback'
  },
  githubAuth: {
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:9000/api/github/callback'
  },
};