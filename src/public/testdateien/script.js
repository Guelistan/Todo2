"use strict";

let historyList = [];
const maxHistoryItems = 10;

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
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    listItem.style.backgroundColor = getRandomRainbowColor();
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = () => {
        todoText.classList.toggle('completed', checkbox.checked);
        if (checkbox.checked) {
            addToHistory(todoText.textContent || "Unbekannte Aufgabe");
            listItem.remove();
        }
    };
    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todoInput.value;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.onclick = () => listItem.remove();
    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    listItem.appendChild(deleteButton);

    if (imageInput.files.length > 0) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(imageInput.files[0]);
        image.className = 'todo-image';
        listItem.appendChild(image);
    }

    todoList.appendChild(listItem);
    todoInput.value = '';
    imageInput.value = '';

    saveTodos();
}

function getRandomRainbowColor() {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

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

function saveTodos() {
    const todoList = document.getElementById('todoList');
    if (!todoList) {
        console.error("Todo-Liste nicht gefunden");
        return;
    }
    const todos = [];
    todoList.querySelectorAll('.todo-item').forEach(item => {
        const todoText = item.querySelector('.todo-text').textContent;
        const image = item.querySelector('.todo-image') ? item.querySelector('.todo-image').src : null;
        todos.push({ text: todoText, image: image });
    });
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
}

function loadTodos() {
    const todoList = document.getElementById('todoList');
    if (!todoList) {
        console.error("Todo-Liste nicht gefunden");
        return;
    }
    const json = localStorage.getItem('todos');
    if (json) {
        const todos = JSON.parse(json);
        todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.className = 'todo-item';
            listItem.style.backgroundColor = getRandomRainbowColor();
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.onclick = () => {
                todoText.classList.toggle('completed', checkbox.checked);
                if (checkbox.checked) {
                    addToHistory(todoText.textContent || "Unbekannte Aufgabe");
                    listItem.remove();
                }
            };
            const todoText = document.createElement('span');
            todoText.className = 'todo-text';
            todoText.textContent = todo.text;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Löschen';
            deleteButton.onclick = () => listItem.remove();
            listItem.appendChild(checkbox);
            listItem.appendChild(todoText);
            listItem.appendChild(deleteButton);
            if (todo.image) {
                const image = document.createElement('img');
                image.src = todo.image;
                image.className = 'todo-image';
                listItem.appendChild(image);
            }

            todoList.appendChild(listItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadTodos);
