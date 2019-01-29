const express = require('express');

const router = express.Router();

const { producten, categories } = require('../lijst_producten.js');

// GET route
router.get('/', (req, res) => {
    res.send(producten);
});

module.exports = router;