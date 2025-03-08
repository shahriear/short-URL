const express = require('express');
const dbConnect = require('./Config/dbConnection');
require('dotenv').config();
const router = require('./router');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(router);
dbConnect();

app.listen(3000, () => {
  console.log('server is running...!');
});

// hRLiCXPjDjOGuV5q;

//clss-8 time:--
