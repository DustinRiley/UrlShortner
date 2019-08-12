var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
const urlShortnerRoute = require('./routes/urlShortnerRoute');


const mongoUrl = "mongodb+srv://herokuUser:shortentmyurl@urls-xo2pm.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
});

//Clean up the connection when cntrl+c is pressed
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log("Closing the mongodb connection");
    process.exit(0);
  });
});

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', urlShortnerRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3030,()=>{
  console.log('connected on port 3030');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
