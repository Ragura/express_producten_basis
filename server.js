// require() is het equivalent van import() voor Node applicaties
// Express is het server framework
const express = require("express");

// Cross Origin Resource Sharing (CORS) zorgt ervoor dat een domein
// aanvragen kan doen aan andere domeinen
const cors = require("cors");

// Maak een nieuwe express app 
const app = express();

// Een server draait op een adres en een poort.
// Laat de poort uit de Node environment variable lezen
// als ze niet bestaat, neem een standaardwaarde
const port = process.env.PORT || 3333;

// de use() methode van een express app registreert middleware.
// Middleware zijn functies die worden uitgevoerd bij elke request aan de server
// Er kunnen meerdere middleware functies geregistreerd worden
// Ze worden uitgevoerd in volgorde van registratie
app.use(cors());

// express.json() is een middleware die requests met een JSON-payload interpreteert
// en beschikbaar stelt binnen het req.body object.
app.use(express.json());

// Require een eigen .js bestand dat routergegevens exporteert
const producten = require('./routes/producten');

// de get() methode registreert een route met een bijhorende afhandelfunctie (handler)
// zulke handler functie neemt als parameters minstens req en res aan (de request en de response)
app.get("/", (req, res) => {
    // status zet de HTTP status code van de response header
    res.status(403).send("Gebruik de API!");
})

// app.use() kan in dit geval gebruikt worden om een router in te stellen
// voor een bepaald pad, in dit geval het pad /producten
app.use('/producten', producten);

// Fallback voor alle andere mogelijke adressen, moet laatst in de reeks komen!
app.get("*", (req, res) => {
    // sendStatus stuurt een HTTP status code zonder boodschap
    res.sendStatus(404);
})

// Start de server door te luisteren naar requests op een bepaalde poort
app.listen(port, () => {
    console.log(`Server runt op poort ${port}`);
})