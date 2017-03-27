var cradle = require('cradle');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://root:1234@ds137550.mlab.com:37550/messages', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(666, () => {
    console.log('I\'m running at port 666 hooray');
  })
});

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('pages/index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save(req.body, (err, result) => {
  if (err) return console.log(err);

  console.log('saved to database');
  res.redirect('/');
})
});
