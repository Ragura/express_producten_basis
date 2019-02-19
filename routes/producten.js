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

router.post("/", (req, res) => {
    const data = req.body;
    producten.push({
        id: getLastId(producten) + 1,
        ...data
    });

    res.send(producten[producten.length - 1]);
});

router.put("/:id", (req, res) => {
    const data = req.body;

    const product = producten.find(p => {
        return p.id === +req.params.id;
    });
    
    if (!product) return res.status(404).send("Product bestaat niet!");

    const productIndex = producten.indexOf(product);
    
    producten.splice(productIndex, 1, {...product, ...data});

    res.send(producten[productIndex]);
});

router.delete("/:id", (req, res) => {
    const productIndex = producten.findIndex(p => {
        return p.id === +req.params.id
    });

    if (productIndex < 0) return res.status(404).send("Product bestaat niet!");

    producten.splice(productIndex, 1);

    res.send("Product verwijderd!");
});

// Helper methode om hoogste ID te vinden in een array van objecten
function getLastId(obj) {

    // De array functie reduce() overloopt elk element in een array en houdt een
    // cumulatieve waarde bij. In dit geval houdt het bij welke gevonden ID de hoogste is
    return obj.reduce((acc, curr) => {
        return Math.max(+curr.id, acc);
    }, 0);
}

// Om in Node objecten, functies, variabelen, ... te exporteren maak je gebruik van
// module.exports
module.exports = router;