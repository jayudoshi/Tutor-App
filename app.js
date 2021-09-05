var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()

var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var invitesRouter = require('./routes/invites');
var tasksRouter = require('./routes/todolist');
var otpRouter = require('./routes/otp');

require('./mongodb');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/courses' , coursesRouter);
app.use('/invites' , invitesRouter);
app.use('/tasks',tasksRouter);
app.use('/otp' , otpRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,'/frontend/build')));
  app.get('*', function (req, res) {
     res.sendFile(path.join(__dirname, 'frontend' , 'build', 'index.html'));
   });
}else{
  app.get('*' , (req,res) => {
      res.send("Api running !!");
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Users")
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json({err:err});
});

module.exports = app;
