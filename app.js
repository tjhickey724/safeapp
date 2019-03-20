console.log("loading app.js")
const
 createError = require('http-errors'),
 express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 axios = require('axios'),
 //classesController = require('./controllers/classesController'),
 //skillsController = require('./controllers/skillsController'),
 //evidenceController = require('./controllers/evidenceController'),
 //studentsController = require('./controllers/studentsController'),
 //usersController = require('./controllers/usersController'),
 session = require("express-session"),
 bodyParser = require("body-parser"),
 //User = require( './models/User' ),
 flash = require('connect-flash')

//const Crime = require( './models/Crime' );



var app = express();

app.locals._ = require("underscore");
//app.locals._.uniq = require("underscore.unique");
//console.log("\nunderscore = "+app.locals._)
//console.log("uniq = "+app.locals._.uniq)


// skillsRouter = require('./routes/skills'),
const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/crimedb' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

var app = express();

// here is where we connect to the database!


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware to process the req object and make it more useful!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'zzbbyanana789789t567556575' }));
app.use(flash());
//app.use(passport.initialize());
//app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

// this handles all static routes ...
// so don't name your routes so they conflict with the public folders
app.use(express.static(path.join(__dirname, 'public')));




// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    return true;
}



app.get('/fbi',function(req,res){
  console.log('inside app.get fbi')
  const apikey = "gcjJlOUptmFW8r9ro441bqSNT3mzd4NN6JPbSz6Z"
  const oriurl = "https://api.usa.gov/crime/fbi/sapi/api/agencies?api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"

  let endpoint = "api/data/nibrs/robbery/victim/agencies/MA0132000/age"
  let url2 = "https://api.usa.gov/crime/fbi/sapi/"+endpoint+"?api_key="+apikey

  axios.get(url2)
  .then(function (response) {
    console.log("got the response");
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.get('/ori',function(req,res){
  console.log('inside app.get fbi')
  const apikey = "gcjJlOUptmFW8r9ro441bqSNT3mzd4NN6JPbSz6Z"
  const oriurl = "https://api.usa.gov/crime/fbi/sapi/api/agencies?api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"

  let endpoint = "api/data/nibrs/robbery/victim/agencies/MA0132000/age"
  let url2 = "https://api.usa.gov/crime/fbi/sapi/"+endpoint+"?api_key="+apikey

  axios.get(oriurl)
  .then(function (response) {
    console.log("got the response");
    res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.get('/',function(req,res){
  console.log("you are looking at the right code!")
  res.render("index",{content:"main"})
    }
)

app.get('/addzip',function(req,res){
  res.render("index", {content:"addzip"})
    }
)


module.exports = app;
