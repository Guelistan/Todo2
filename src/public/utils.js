export function getRandomRainbowColor() {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function saveTodos() {
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
    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todos)
    }).then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Fehler beim Speichern:', error));
}

export function addToHistory(task) {
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
