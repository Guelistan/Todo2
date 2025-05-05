"use strict";

import { openCamera, takePicture } from '../cameraFunctions.js';

// Liste, um erledigte Aufgaben zu speichern
let historyList = [];
const maxHistoryItems = 10; // Maximale Anzahl von Einträgen in der Historie

// Funktion, um eine zufällige Regenbogenfarbe zu generieren
function getRandomRainbowColor() {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Funktion, um eine Aufgabe zur Historie hinzuzufügen
function addToHistory(task) {
    const historyContainer = document.getElementById('historyContainer'); // Container für die Historie
    const hiddenList = document.getElementById('hiddenHistory'); // Versteckte Liste für alte Einträge
    if (!historyContainer || !hiddenList) {
        console.error("Historien-Container nicht gefunden"); // Fehler, wenn ein Element fehlt
        return;
    }

    // Neues Listenelement für die Historie erstellen
    const historyItem = document.createElement('li');
    historyItem.textContent = `${task} - Erledigt am: ${new Date().toLocaleDateString()} um ${new Date().toLocaleTimeString()}`;
    historyList.push(historyItem); // Eintrag zur Historienliste hinzufügen

    // Wenn die maximale Anzahl erreicht ist, den ältesten Eintrag in die versteckte Liste verschieben
    if (historyList.length > maxHistoryItems) {
        hiddenList.appendChild(historyList.shift());
    }

    historyContainer.appendChild(historyItem); // Eintrag zur Historie im DOM hinzufügen
}

// Funktion zum Hinzufügen einer neuen Aufgabe
function addTodo() {
    const todoInput = document.getElementById('todoInput'); // Eingabefeld für die Aufgabe
    const todoList = document.getElementById('todoList'); // Liste, in der die Aufgaben angezeigt werden
    const imageInput = document.getElementById('imageInput'); // Eingabefeld für das Hochladen eines Bildes
    if (!todoInput || !todoList || !imageInput) {
        console.error("Elemente nicht gefunden"); // Fehler, wenn ein Element fehlt
        return;
    }
    if (!todoInput.value.trim()) {
        alert('Bitte geben Sie eine Aufgabe ein!'); // Warnung, wenn das Eingabefeld leer ist
        return;
    }

    // Neues Listenelement für die Aufgabe erstellen
    const listItem = document.createElement('li');
    listItem.className = 'todo-item'; // CSS-Klasse für Styling
    listItem.style.backgroundColor = getRandomRainbowColor(); // Zufällige Hintergrundfarbe

    // Checkbox hinzufügen, um die Aufgabe als erledigt zu markieren
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = () => {
        todoText.classList.toggle('completed', checkbox.checked); // CSS-Klasse für erledigte Aufgaben
        if (checkbox.checked) {
            addToHistory(todoText.textContent || "Unbekannte Aufgabe"); // Aufgabe zur Historie hinzufügen
            listItem.remove(); // Aufgabe aus der Liste entfernen
            saveTodos(); // Aufgaben speichern
        }
    };

    // Text der Aufgabe hinzufügen
    const todoText = document.createElement('span');
    todoText.className = 'todo-text'; // CSS-Klasse für Styling
    todoText.textContent = todoInput.value;

    // Löschen-Button hinzufügen
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.onclick = () => {
        listItem.remove(); // Aufgabe aus der Liste entfernen
        saveTodos(); // Aufgaben speichern
    };

    // Elemente zum Listenelement hinzufügen
    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    listItem.appendChild(deleteButton);

    // Bild hinzufügen, falls eines hochgeladen wurde
    if (imageInput.files.length > 0) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(imageInput.files[0]); // Bildquelle aus der Datei erstellen
        image.className = 'todo-image'; // CSS-Klasse für Styling
        listItem.appendChild(image);
    }

    // Aufgabe zur Liste hinzufügen
    todoList.appendChild(listItem);
    todoInput.value = ''; // Eingabefeld leeren
    imageInput.value = ''; // Bild-Eingabefeld leeren

    saveTodos(); // Aufgaben speichern
}

// Funktion, um die Aufgaben zu speichern
function saveTodos() {
    const todoList = document.getElementById('todoList'); // Aufgabenliste
    if (!todoList) {
        console.error("Todo-Liste nicht gefunden"); // Fehler, wenn die Liste fehlt
        return;
    }

    // Aufgaben in ein Array speichern
    const todos = [];
    todoList.querySelectorAll('.todo-item').forEach(item => {
        const todoText = item.querySelector('.todo-text').textContent; // Text der Aufgabe
        const image = item.querySelector('.todo-image') ? item.querySelector('.todo-image').src : null; // Bild der Aufgabe
        todos.push({ text: todoText, image: image }); // Aufgabe und Bild speichern
    });

    // Aufgaben an den Server senden
    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todos)
    }).then(response => response.text())
        .then(data => console.log(data)) // Erfolgsnachricht ausgeben
        .catch(error => console.error('Fehler beim Speichern:', error)); // Fehler ausgeben
}

// Funktion, um die Aufgaben vom Server zu laden
function loadTodos() {
    const todoList = document.getElementById('todoList'); // Aufgabenliste
    if (!todoList) {
        console.error("Todo-Liste nicht gefunden"); // Fehler, wenn die Liste fehlt
        return;
    }

    // Aufgaben vom Server abrufen
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => {
                // Neues Listenelement für jede Aufgabe erstellen
                const listItem = document.createElement('li');
                listItem.className = 'todo-item';
                listItem.style.backgroundColor = getRandomRainbowColor(); // Zufällige Hintergrundfarbe

                // Checkbox hinzufügen
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.onclick = () => {
                    todoText.classList.toggle('completed', checkbox.checked); // CSS-Klasse für erledigte Aufgaben
                    if (checkbox.checked) {
                        addToHistory(todoText.textContent || "Unbekannte Aufgabe"); // Aufgabe zur Historie hinzufügen
                        listItem.remove(); // Aufgabe aus der Liste entfernen
                        saveTodos(); // Aufgaben speichern
                    }
                };

                // Text der Aufgabe hinzufügen
                const todoText = document.createElement('span');
                todoText.className = 'todo-text';
                todoText.textContent = todo.text;

                // Löschen-Button hinzufügen
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Löschen';
                deleteButton.onclick = () => {
                    listItem.remove();
                    saveTodos();
                };

                // Elemente zur Liste hinzufügen
                listItem.appendChild(checkbox);
                listItem.appendChild(todoText);
                listItem.appendChild(deleteButton);

                // Falls ein Bild vorhanden ist, es zur Liste hinzufügen
                if (todo.image) {
                    const image = document.createElement('img');
                    image.src = todo.image;
                    image.className = 'todo-image';
                    listItem.appendChild(image);
                }

                // To-Do zur Liste hinzufügen
                todoList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Fehler beim Laden:', error));
}

// Beispiel: Kamera öffnen
document.getElementById('openCameraButton').addEventListener('click', () => {
    openCamera();
});

// Beispiel: Bild aufnehmen
document.getElementById('takePictureButton').addEventListener('click', () => {
    takePicture();
});
