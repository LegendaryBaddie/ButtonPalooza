const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Putton';

mongoose.connect(dbURL, (err) => {
  if(err){
    console.log('Could not connect to database');
    throw err;
  }
});

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
app.use(express.static(path.resolve(`${__dirname}/../client`)));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key:'sessionid',
  secret: 'Palooza Time',
  resave: true,
  saveUninitialized: true,
}));

router(app);

app.listen(port, (err) =>{
  if(err){
    throw err;
  }
  console.log(`Listening on 127.0.0.1: ${port}`);
});

