const express = require('express')
const express_session = require('express-session')
const mongoose = require('./resource/dbconnect');
const { flash } = require('express-flash-message');
var timeout = require('connect-timeout')
const bodyParser = require('body-parser')
const app = express();

var cors = require('cors')
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json({ type: 'application/*+json' }))
// parse some custom thing into a Buffer
app.use(bodyParser.raw())
app.set('trust proxy', 1);
const MongoStore = require('connect-mongo')(express_session);
app.use(express_session({
    cookie:{
        secure: true,
        maxAge:60000
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        interval: 120000,
        mongooseConnection: mongoose.connection,
        db:'session'
    }) 
}));

app.use(flash({locals: 'flash'}));


path = require('path');
// app.use(function (req, res) {
//     // res.setHeader('Content-Type', 'application/json')
//     console.log(res)
//     res.write('you posted:\n')
//     console.log(req.body)
//     res.end(JSON.stringify(req.body, null, 2))
// })

const DefaultRoute = require('./api/routes/defaultRoute');
app.set('view engine', 'ejs')
app.use('/', DefaultRoute);


const morgan = require('morgan');

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['ejs', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }

    app.use(timeout('30s'))
    app.use(haltOnTimedout)
    app.use(haltOnTimedout)

    // Add your routes here, etc.

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next()
}
app.use(express.static(__dirname, [options]));
//Connect DB
mongoose.Promise   = global.Promise;
const db = mongoose.connection


app.use(morgan('dev'))


//console.log(process.env.GMAIL_USER)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
    res.header('Content-Type', 'text/form-data');

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.get('*', function(req, res){
    res.status(404).send('what???');
});
app.use((req, res, next) => {
   const error = new Error('Not found');
    error.status = 404;
    next(error); co
});

module.exports = app;