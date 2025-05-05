// Import der benötigten Module
import { getRandomRainbowColor } from './utils.js';
import { openCropper, cropImage } from './cropperFunctions.js';
import { openCamera } from './cameraFunctions.js';

let historyList = [];
const maxHistoryItems = 10;

// Funktion zum Hinzufügen einer neuen Aufgabe
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const imageInput = document.getElementById('imageInput');

    if (!todoInput || !todoList || !imageInput) {
        console.error("Elemente nicht gefunden");
        return;
    }

    if (!todoInput.value.trim()) {
        alert('Bitte geben Sie eine Aufgabe ein!');
        return;
    }

    const listItem = createTodoItem(todoInput.value, imageInput.files[0]);
    todoList.appendChild(listItem);

    todoInput.value = '';
    imageInput.value = '';
    saveTodos();
}

// Hilfsfunktion zum Erstellen eines Todo-Listenelements
function createTodoItem(text, imageFile) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    listItem.style.backgroundColor = getRandomRainbowColor();

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = () => handleCheckboxToggle(checkbox, listItem, text);

    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.onclick = () => {
        listItem.remove();
        saveTodos();
    };

    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    listItem.appendChild(deleteButton);

    if (imageFile) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(imageFile);
        image.className = 'todo-image';
        listItem.appendChild(image);
    }

    return listItem;
}

// Checkbox-Handler
function handleCheckboxToggle(checkbox, listItem, text) {
    const todoText = listItem.querySelector('.todo-text');
    todoText.classList.toggle('completed', checkbox.checked);

    if (checkbox.checked) {
        addToHistory(text);
        listItem.remove();
        saveTodos();
    }
}

// Funktion, um eine Aufgabe zur Historie hinzuzufügen
function addToHistory(task) {
    const historyContainer = document.getElementById('historyContainer');
    const hiddenList = document.getElementById('hiddenHistory');

    if (!historyContainer || !hiddenList) {
        console.error("Historien-Container nicht gefunden");
        return;
    }

    const historyItem = document.createElement('li');
    historyItem.textContent = `${task} - Erledigt am: ${new Date().toLocaleDateString()} um ${new Date().toLocaleTimeString()}`;
    historyList.push(historyItem);

    if (historyList.length > maxHistoryItems) {
        hiddenList.appendChild(historyList.shift());
    }

    historyContainer.appendChild(historyItem);
}

// Funktion, um die Aufgaben zu speichern
function saveTodos() {
    const todoList = document.getElementById('todoList');

    if (!todoList) {
        console.error("Todo-Liste nicht gefunden");
        return;
    }

    const todos = Array.from(todoList.querySelectorAll('.todo-item')).map(item => {
        const todoText = item.querySelector('.todo-text').textContent;
        const image = item.querySelector('.todo-image')?.src || null;
        return { text: todoText, image };
    });

    fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todos)
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Fehler beim Speichern:', error));
}

// Funktion, um die Aufgaben vom Server zu laden
function loadTodos() {
    const todoList = document.getElementById('todoList');

    if (!todoList) {
        console.error("Todo-Liste nicht gefunden");
        return;
    }

    fetch('/todos')
        .then(response => {
            if (!response.ok) throw new Error('Netzwerkantwort war nicht ok');
            return response.json();
        })
        .then(todos => {
            todos.forEach(todo => {
                const listItem = createTodoItem(todo.text, null);
                if (todo.image) {
                    const image = document.createElement('img');
                    image.src = todo.image;
                    image.className = 'todo-image';
                    listItem.appendChild(image);
                }
                todoList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Fehler beim Laden der Daten:', error));
}

// Event-Listener hinzufügen
document.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById('addTodoButton')?.addEventListener('click', addTodo);

// Funktionen global verfügbar machen
window.openCropper = openCropper;
window.openCamera = openCamera;
