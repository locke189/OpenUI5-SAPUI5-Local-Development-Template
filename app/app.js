var express = require('express');
var app = express();

app.use(express.static('webapp'));

//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});

app.get('/', function (req, res, next) {

  var options = {
    root: __dirname + '/../webapp/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = 'localenv.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

});

app.listen(3000, function () {
  console.log('Local OpenUI5 app listening on port 3000!');
});
