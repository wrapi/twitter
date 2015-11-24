'use strict';


var wrapi = require('wrapi');

var endpoints = {
  statuses: require('./api/statuses.json'),
  media: require('./api/media.json'),
  direct_messages: require('./api/direct_messages.json'),
  search: require('./api/search.json'),
  friendships: require('./api/friendships.json'),
  friends: require('./api/friends.json'),
  followers: require('./api/followers.json'),
  account: require('./api/account.json'),
  blocks: require('./api/blocks.json'),
  users: require('./api/users.json'),
  favorites: require('./api/favorites.json'),
  lists: require('./api/lists.json'),
  saved_searches: require('./api/saved_searches.json'),
  geo: require('./api/geo.json'),
  trends: require('./api/trends.json'),
  application: require('./api/application.json'),
  help: require('./api/help.json')
};

var usersEndPoints = {
  suggestions: require('./api/users/suggestions.json')
};

var listsEndpoints = {
  members: require('./api/lists/members.json'),
  subscribers: require('./api/lists/subscribers.json')
};

/*
{
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  token: 'ACCESS_TOKEN',
  token_secret: 'ACCESS_TOKEN_SECRET'
}
*/
var twitterWrapi = function(keys) {

  var opts = {
    oauth: keys,
    headers: {
      'User-Agent': 'twitter-wrapi'
    },
    qs: {
      stringify_ids: true
    }
  };

  function append(obj, suffix, endpoints) {
    for (var name in endpoints) {
      obj[name] = new wrapi('https://api.twitter.com/1.1/' + suffix + name + '/', 
        endpoints[name], 
        opts
      );
    }
  }

  append(this, '', endpoints);
  append(this.users, 'users/', usersEndPoints);
  append(this.lists, 'lists/', listsEndpoints);
};



module.exports = twitterWrapi;
