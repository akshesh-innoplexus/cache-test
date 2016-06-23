var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')();

/* GET users listing. */
router.get('/',
  cache.route(),
  function(req, res, next) {
    res.send('respond with a resource');
  }
);

module.exports = router;

/*
var express = require('express');
var router = express.Router();

// Connect to redis db
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('connected');
});
*/


// GET home page. 
/*
router.get('/', function(req, res, next) {
  client.keys('*', function(err, reply){
    console.log(reply);
    res.json({'data':reply});
  });
  // res.send('lkj');
  // res.render('index', { title: 'Express' });
});

// // replace
// app.get('/',
//   function (req, res)  { ... }
// );
 
// // by 
// app.get('/',
//   cache.route(),
//   function (req, res)  { ... }
// );

module.exports = router;
*/