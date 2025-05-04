const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/todos', (req, res) => {
    fs.readFile('todos.json', (err, data) => {
        if (err) {
            return res.status(500).send('Fehler beim Lesen der Datei');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/todos', (req, res) => {
    fs.writeFile('todos.json', JSON.stringify(req.body), (err) => {
        if (err) {
            return res.status(500).send('Fehler beim Speichern der Datei');
        }
        res.send('Daten erfolgreich gespeichert');
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
