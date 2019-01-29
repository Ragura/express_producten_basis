const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3333;

const producten = require('./routes/producten');

app.use(cors());

app.get("/", (req, res) => {
    // status zet de HTTP status code van de response header
    res.status(403).send("Gebruik de API!");
})

// app.use() kan in dit geval gebruikt worden om een router in te stellen
// voor een bepaald pad, in dit geval het pad /producten
app.use('/producten', producten);

// Fallback, moet laatst in de reeks komen!
app.get("*", (req, res) => {
    // sendStatus stuurt een HTTP status code zonder boodschap
    res.sendStatus(404);
})

// Start de server door te luisteren naar requests op een bepaalde poort
app.listen(port, () => {
    console.log(`Server runt op poort ${port}`);
})