var express = require('express')
var app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/link1', function (req, res) {
  res.render('link1')
})

app.get('/link2', function (req, res) {
  res.render('link2')
})

app.listen(5000, function () {
    console.log('Example app listening on port 7000')
})
