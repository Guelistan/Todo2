"use strict";
function addTodo() {
    // Holen Sie das Eingabefeld und die To-Do-Liste aus dem DOM
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    // Überprüfen, ob das Eingabefeld leer ist
    if (todoInput.value.trim() === '') {
        alert('Bitte geben Sie eine Aufgabe ein!');
        return;
    }
    // Erstellen eines neuen Listenelements für die To-Do-Aufgabe
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    // Erstellen eines Kontrollkästchens für die Aufgabe
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = () => {
        // Umschalten der 'completed'-Klasse basierend auf dem Kontrollkästchenstatus
        todoText.classList.toggle('completed', checkbox.checked);
    };
    // Erstellen eines Span-Elements für den Text der Aufgabe
    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todoInput.value;
    // Erstellen eines Löschbuttons für die Aufgabe
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.onclick = () => {
        // Entfernen des Listenelements aus der To-Do-Liste
        listItem.remove();
    };
    // Hinzufügen des Kontrollkästchens, des Textes und des Löschbuttons zum Listenelement
    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    listItem.appendChild(deleteButton);
    // Hinzufügen des Listenelements zur To-Do-Liste
    todoList.appendChild(listItem);
    // Leeren des Eingabefelds
    todoInput.value = '';
}
