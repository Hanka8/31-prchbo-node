var express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite() {
    try {
      // Load website
      const response = await axios.get('https://kariera.army.cz/volna-mista');
      const html = response.data;

      // Parse HTML with Cheerio
      const $ = cheerio.load(html);

      // Find and filter job listings
      const jobListings = $('li.views-row').filter((index, element) => {
        const text = $(element).text();
        return text.includes('123');
      });

      // Print filtered job listings
      console.log('<ul>');
      jobListings.each((index, element) => {
        console.log($.html(element));
      });
      console.log('</ul>');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  scrapeWebsite();

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
