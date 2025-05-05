// Importieren der benötigten Module
const express = require('express'); // Express für die Erstellung eines Webservers
const bodyParser = require('body-parser'); // Body-Parser zum Verarbeiten von JSON-Daten
const fs = require('fs'); // fs-Modul zum Lesen und Schreiben von Dateien

// Initialisieren der Express-App
const app = express();
const port = 3000; // Definieren des Ports, auf dem der Server läuft

// Middleware für JSON-Parsing und statische Dateien
app.use(bodyParser.json()); // Damit der Server eingehende JSON-Daten versteht
app.use(express.static('public')); // Bereitstellen statischer Dateien aus dem "public"-Ordner

// Route zum Abrufen der Todos (GET-Anfrage)
app.get('/todos', (req, res) => {
    // Datei "todos.json" lesen, um gespeicherte Daten abzurufen
    fs.readFile('todos.json', (err, data) => {
        if (err) {
            return res.status(500).send('Fehler beim Lesen der Datei'); // Fehlerbehandlung
        }
        res.send(JSON.parse(data)); // JSON-Daten an den Client senden
    });
});

// Route zum Speichern von Todos (POST-Anfrage)
app.post('/todos', (req, res) => {
    // Datei "todos.json" mit empfangenen Daten überschreiben
    fs.writeFile('todos.json', JSON.stringify(req.body), (err) => {
        if (err) {
            return res.status(500).send('Fehler beim Speichern der Datei'); // Fehlerbehandlung
        }
        res.send('Daten erfolgreich gespeichert'); // Erfolgreiche Speicherung bestätigen
    });
});

// Server starten und auf Anfragen hören
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`); // Konsolenausgabe für Serverstart
});
