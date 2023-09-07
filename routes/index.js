var express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
var router = express.Router();

router.get('/', async function (req, res, next) {
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

    const jobNames = [];
    const jobDescriptions = [];
    const ranks = [];

    // Extract data from job listings
    jobListings.each((index, element) => {
      const $element = $(element);

      // Extract job names
      const fieldContentSpans = $element.find('span.field-content');
      const jobName = fieldContentSpans.eq(0).text();
      jobNames.push(jobName);

      // Extract job descriptions
      const pElements = $element.find('.field-content p');
      const jobDescription = pElements
        .map((i, pElement) => $(pElement).text())
        .get()
        .filter((pText) => pText[0] !== '+')
        .join('\n');
      jobDescriptions.push(jobDescription);

      // Extract image titles (assuming image titles are in alt attributes)
      const imageTitles = $element.find('img[title]');
      const rankTitles = imageTitles
        .map((i, imageElement) => $(imageElement).attr('title'))
        .get();
      ranks.push(rankTitles);
    });

    console.log(jobNames)
    console.log(jobDescriptions);
    console.log(ranks);
    // Render the view and pass data to it
    res.render('index', {
      title: '31. pluk',
      jobNames: jobNames,
      jobDescriptions: jobDescriptions,
      ranks: ranks,
    });
  } catch (error) {
    console.error('Error:', error);
    next(error); // Pass the error to the error handler middleware
  }
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
