const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const clientesRouter = require('./routes/clientes');
const apiRouter = require('./routes/api');
const middlewares = require('./routes/middlewares')
// variables de entorno
require('dotenv').config()

// inicio express
const app = express();

// creamos la conexion con la BBDD
require('./db').connect();


/* db.query('SELECT * FROM clientes', (err,rows)=>{
  if (err) console.log(err);
  console.log(rows);  
}); */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(middlewares.mainRedirect)

// gestion de rutas

app.use('/clientes', clientesRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
