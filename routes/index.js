var express = require('express');
var router = express.Router();

// Connect to redis db
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('Connected to redis database!');
});

var cache = require('express-redis-cache')({client: client, expire: 10});
var Article = require('../models/articles');

router.get('/data-redis',
  function(req, res, next) {
    console.log('Fetching from redis database...');
    console.time('Fetching from database took');
    next();
  },
  function(req, res) {
    // client.keys('*', function(err, reply){
    //   // console.log(reply);
    //   res.json({'data':reply});
    // });
    client.get('long_text', function(err, val){
      console.timeEnd('Fetching from database took');
      res.json({'data': val});
    })
  }
);

router.get('/data-mongo',
  function(req, res, next) {
    console.log('Fetching from mongoose database...');
    console.time('Fetching from database took');
    next();
  },
  function(req, res) {
    // client.keys('*', function(err, reply){
    //   // console.log(reply);
    //   res.json({'data':reply});
    // });
    Article.findOne({}, function(err, obj){
      console.timeEnd('Fetching from database took');
      res.json({'data': obj.txt});
    });
  }
);

router.get('/data-use-cache',
  function (req, res, next) {
    console.log('Fetching from cache...');
    console.time('Fetching from cache took');
    next();
  },
  cache.route(),
  function(req, res) {
    // client.keys('*', function(err, reply){
    //   // console.log(reply);
    //   res.json({'data':reply});
    // });
    client.get('long_text', function(err, val){
      res.json({'data': val});
    });
  }
);

module.exports = router;
