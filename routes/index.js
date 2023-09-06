var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '31. pluk' });
});

router.get('/kasarna', function(req, res, next) {
  res.render('kasarna', { title: 'Historie kasáren' });
});

router.get('/chemici', function(req, res, next) {
  res.render('chemici', { title: 'Historie chemického vojska' });
});

router.get('/liberec', function(req, res, next) {
  res.render('liberec', { title: 'Historie Liberce' });
});

module.exports = router;
