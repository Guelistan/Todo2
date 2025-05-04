// TypeScript-Datei

interface Task {
    text: string;
    completedAt?: Date;
}

let historyList: HTMLElement[] = [];
const maxHistoryItems: number = 10;

function addTodo(): void {
    const todoInput: HTMLInputElement | null = document.getElementById('todoInput') as HTMLInputElement;
    const todoList: HTMLUListElement | null = document.getElementById('todoList') as HTMLUListElement;

    if (!todoInput || !todoList) {
        console.error("Elemente nicht gefunden");
        return;
    }

    if (!todoInput.value.trim()) {
        alert('Bitte geben Sie eine Aufgabe ein!');
        return;
    }

    const listItem: HTMLLIElement = document.createElement('li');
    listItem.className = 'todo-item';
    listItem.style.backgroundColor = getRandomRainbowColor();

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = () => {
        todoText.classList.toggle('completed', checkbox.checked);
        if (checkbox.checked) {
            addToHistory(todoText.textContent || "Unbekannte Aufgabe");
            listItem.remove();
        }
    };

    const todoText: HTMLSpanElement = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todoInput.value;

    const deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.onclick = () => listItem.remove();

    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
    todoInput.value = '';
}

function getRandomRainbowColor(): string {
    const colors: string[] = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function addToHistory(task: string): void {
    const historyContainer: HTMLUListElement | null = document.getElementById('historyContainer') as HTMLUListElement;
    const hiddenList: HTMLUListElement | null = document.getElementById('hiddenHistory') as HTMLUListElement;

    if (!historyContainer || !hiddenList) {
        console.error("Historien-Container nicht gefunden");
        return;
    }

    const historyItem: HTMLLIElement = document.createElement('li');
    historyItem.textContent = `${task} - Erledigt am: ${new Date().toLocaleDateString()} um ${new Date().toLocaleTimeString()}`;
    historyList.push(historyItem);

    if (historyList.length > maxHistoryItems) {
        hiddenList.appendChild(historyList.shift()!);
    }

    historyContainer.appendChild(historyItem);
}
