// Funktion zum zufälligen Auswählen einer Regenbogenfarbe
export function getRandomRainbowColor() {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF']; // Array mit Regenbogenfarben
    return colors[Math.floor(Math.random() * colors.length)]; // Zufällige Farbe aus der Liste zurückgeben
}

// Funktion zum Speichern der To-Do-Liste
export function saveTodos() {
    const todoList = document.getElementById('todoList'); // To-Do-Listen-Element abrufen
    if (!todoList) {
        console.error("Todo-Liste nicht gefunden"); // Fehler melden, falls die Liste nicht existiert
        return;
    }

    const todos = []; // Leeres Array zur Speicherung der To-Dos

    // Alle Einträge in der To-Do-Liste durchgehen und speichern
    todoList.querySelectorAll('.todo-item').forEach(item => {
        const todoText = item.querySelector('.todo-text').textContent; // Text der To-Do abrufen
        const image = item.querySelector('.todo-image') ? item.querySelector('.todo-image').src : null; // Bild abrufen, falls vorhanden
        todos.push({ text: todoText, image: image }); // Objekt mit Text und Bild zur Liste hinzufügen
    });

    // Senden der To-Do-Daten an den Server
    fetch('/todos', {
        method: 'POST', // POST-Anfrage zum Speichern
        headers: {
            'Content-Type': 'application/json' // Festlegen des Datenformats
        },
        body: JSON.stringify(todos) // Umwandeln der To-Dos in JSON-Format
    }).then(response => response.text())
        .then(data => console.log(data)) // Erfolgsmeldung in der Konsole anzeigen
        .catch(error => console.error('Fehler beim Speichern:', error)); // Fehler behandeln
}

// Funktion zum Hinzufügen einer abgeschlossenen Aufgabe zur Historie
export function addToHistory(task) {
    const historyContainer = document.getElementById('historyContainer'); // Historien-Container abrufen
    const hiddenList = document.getElementById('hiddenHistory'); // Versteckte Historien-Liste abrufen
    if (!historyContainer || !hiddenList) {
        console.error("Historien-Container nicht gefunden"); // Fehler ausgeben, falls nicht vorhanden
        return;
    }

    const historyItem = document.createElement('li'); // Neues Listen-Element erstellen
    historyItem.textContent = `${task} - Erledigt am: ${new Date().toLocaleDateString()} um ${new Date().toLocaleTimeString()}`; // Datum und Uhrzeit hinzufügen
    historyList.push(historyItem); // Element zur Verlaufs-Liste hinzufügen

    // Falls die maximale Anzahl von Historieneinträgen überschritten wird, ältere Elemente auslagern
    if (historyList.length > maxHistoryItems) {
        hiddenList.appendChild(historyList.shift()); // Erstes Element in die versteckte Historie verschieben
    }

    historyContainer.appendChild(historyItem); // Neues Historien-Element in den Container einfügen
}
