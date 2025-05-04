import { getRandomRainbowColor, saveTodos, addToHistory } from './utils.js';
import { croppedImage } from './cropperFunctions.js';

export function addTodo() {
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
            saveTodos();
        }
    };
    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todoInput.value;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.onclick = () => {
        listItem.remove();
        saveTodos();
    };
    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    listItem.appendChild(deleteButton);

    if (croppedImage) {
        const image = document.createElement('img');
        image.src = croppedImage;
        image.className = 'todo-image';
        listItem.appendChild(image);
        croppedImage = null;
    } else if (imageInput.files.length > 0) {
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

export function loadTodos() {
    const todoList = document.getElementById('todoList');
    if (!todoList) {
        console.error("Todo-Liste nicht gefunden");
        return;
    }
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
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
                        saveTodos();
                    }
                };
                const todoText = document.createElement('span');
                todoText.className = 'todo-text';
                todoText.textContent = todo.text;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Löschen';
                deleteButton.onclick = () => {
                    listItem.remove();
                    saveTodos();
                };
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
        })
        .catch(error => console.error('Fehler beim Laden:', error));
}
