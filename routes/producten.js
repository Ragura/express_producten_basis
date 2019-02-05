// Hoewel dit bestand los staat van het starten van de server,
// hebben we onderdelen van het express pakket nodig om een router te maken
const express = require('express');

// Instantieer een nieuwe router
const router = express.Router();

// Ook andere lokale bestanden kunnen worden geïmporteerd met require()
const { producten, categories } = require('../lijst_producten.js');

// GET route voor de root '/'
// Let op: dit "root" pad is niet hetzelfde als de root van de ganse app, enkel van deze router
router.get('/', (req, res) => {
    // De send() methode kan allerlei data doorsturen, in dit geval een json object
    res.send(producten);
});

// Om in Node objecten, functies, variabelen, ... te exporteren maak je gebruik van
// module.exports
module.exports = router;