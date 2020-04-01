const express = require('express');
const morgan = require('morgan');

const path = require('path');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const pollRouter = require('./routes/pollRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//The incoming function might not have / so we use this path.join
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Serving Static Files
//app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.header);
  next();
});

// 3) ROUTES
// app.get('/', (req, res) => {
//   if (req.user) {
//     return res.redirect('/api/v1/users');
//   }
//   res.render('login');
// });

app.use('/api/v1/polls', pollRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
