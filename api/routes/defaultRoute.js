const urlshortner = require("../../api/controllers/UrlShortnerController")


const express = require('express');

const router = express.Router();

router.post('/url_shortner',urlshortner.url_shortner);
router.get('/url_shortner',urlshortner.get_urls);
router.get('/:code',urlshortner.handleRedirection);

module.exports = router;
