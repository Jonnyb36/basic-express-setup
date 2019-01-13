
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
app.use(function(req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}))



/** 1) Meet the node console. */
console.log("Hello World")

/** 2) A first working Express Server */
//app.get('/', function(req,res){
//  res.send('Hello Express');
//})

const absolutePath = __dirname + "/views/index.html";
console.log(absolutePath);
/** 3) Serve an HTML file */
app.get('/', function(req,res){
  res.sendFile(absolutePath);
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route 
app.get("/json", function(req,res){
  res.json({"message": "Hello json"});
})
*/

/** 6) Use the .env file to configure the app */
app.get("/json", function(req,res){
  const message = "Hello json";
  if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({"message": message.toUpperCase()});
  } else {
    res.json({"message": message});
  };
}) 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now", function(req,res,next){
  req.time = new Date(new Date().getTime() + 10000).toString();
  next();
}, function(req,res,next){
  res.json({time: req.time, actualTime: new Date().toString()})
})

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function(req, res){
  res.json({echo: req.params.word});
})


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
///?first=firstname&last=lastname
//app.get('/users/:userId/books/:bookId', function (req, res) {


app.get("/name", function(req, res){
  res.json({name: req.query.first + " " + req.query.last});
})


/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post("/name", function(req, res){
    res.json({name: req.body.first + " " + req.body.last})
  })


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
