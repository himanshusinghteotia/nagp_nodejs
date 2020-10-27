const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/UserModel')
const userRoutes = require('./routes/UserRoutes.js');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var positions = require('./routes/PositionRoutes');
mongoose.Promise = global.Promise;


require("dotenv").config({
  path: path.join(__dirname, "./.env")
});

const app = express();

// mongoose.connect("mongodb://localhost/nag_nagp", { useNewUrlParser: true })
const uri = "mongodb+srv://qwerty2uiop:qwerty2uiop@clusternagp.sllkw.mongodb.net/nag_nagp?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection successful.")
  })
  .catch((err) => {
    console.log(err);
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req, res, next) => {

  if ((req.cookies && req.cookies["x-access-token"]) ) {
    const accessToken = req.cookies["x-access-token"]
    const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  }
  else {
    next();
  }
});

app.use('/', userRoutes);
app.use('/positions', positions);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;