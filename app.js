//var cradle = require('cradle');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


var db;

MongoClient.connect('mongodb://root:1234@ds137550.mlab.com:37550/messages', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(666, () => {
    console.log('I\'m running at port 666 hooray');
  })
});

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

app.get('/admin', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('pages/admin.ejs', {messages: result})
  })
});

app.post('/banhammer', (req, res) => {
  db.collection('messages').drop({}, (err, result) => {
  if (err) return console.log(err);
  res.redirect('/');
})
});
/*
app.post('/banhammer', (req, res) => {
  var id = (req.body.name);
  console.log(id);
  db.id.remove({}, (err, result) => {
  if (err) return console.log(err);

  console.log('message(s) removed from database');
  res.redirect('/');
})
});
*/
//>db.userdetails.remove( { "user_id" : "testuser" } )
