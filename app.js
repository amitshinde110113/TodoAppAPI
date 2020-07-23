const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const http = require('http');
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const userRoute = require('./api/routes/users');
const noteRoutes = require('./api/routes/note');
const checkAuth = require('./api/middleware/check-auth');
mongoose.connect('mongodb+srv://amit_shinde:amit_shinde@cluster0-bzohy.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  });
server.listen(port, function () {
  console.log(`listening on ${port}`);
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/api/users', userRoute);
app.use('/api/notes',checkAuth, noteRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error['status'] = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});
module.exports = app