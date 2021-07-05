const urlshortner = require("../../api/controllers/UrlShortnerController")


const express = require('express');

const router = express.Router();

router.post('/encode',urlshortner.url_shortner);
router.get('/decode_urls',urlshortner.get_urls);
router.get('/:code',urlshortner.handleRedirection);
router.get('/statistics/:code',urlshortner.getStaistics);
module.exports = router;
