var express = require('express')
var app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/overwatch', function (req, res) {
  res.render('overwatch')
})

app.get('/csgo', function (req, res) {
  res.render('csgo')
})

app.listen(5000, function () {
    console.log('Example app listening on port 7000')
})
