document.addEventListener('DOMContentLoaded', function() {
    loadList();
});

document.getElementById('add-item').addEventListener('click', function() {
    document.getElementById('popup-form').style.display = 'flex';
});

document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('popup-form').style.display = 'none';
});

document.getElementById('add-item-btn').addEventListener('click', function() {
    const title = document.getElementById('item-title').value;
    const description = document.getElementById('item-description').value;
    const priority = document.getElementById('item-priority').value;

    if (title && description && priority) {
        const newItem = document.createElement('div');
        newItem.classList.add('draggable-item');
        newItem.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
            <p>Priority: ${priority}</p>
            <button class="delete-btn">X</button>
            <button class="arrow-btn arrow-left">&lt;</button>
            <button class="arrow-btn arrow-right">&gt;</button>
        `;
        document.getElementById('todo').appendChild(newItem);
        addDeleteHandler(newItem.querySelector('.delete-btn'));
        addArrowHandlers(newItem);

        saveList(); // Save list after adding new item

        document.getElementById('popup-form').style.display = 'none';
        document.getElementById('item-title').value = '';
        document.getElementById('item-description').value = '';
        document.getElementById('item-priority').value = '1';
    }
});

function addDeleteHandler(button) {
    button.addEventListener('click', function() {
        const item = button.closest('.draggable-item');
        item.remove();
        saveList(); // Save list after deleting item
    });
}

function addArrowHandlers(item) {
    const leftArrow = item.querySelector('.arrow-left');
    const rightArrow = item.querySelector('.arrow-right');

    leftArrow.addEventListener('click', function() {
        moveItem(item, -1);
    });

    rightArrow.addEventListener('click', function() {
        moveItem(item, 1);
    });
}

function moveItem(item, direction) {
    const currentColumn = item.closest('.column');
    const columns = Array.from(document.querySelectorAll('.column'));
    const currentIndex = columns.indexOf(currentColumn);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < columns.length) {
        columns[newIndex].appendChild(item);
        saveList(); // Save list after moving item
    }
}

document.querySelectorAll('.draggable-item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    this.classList.add('dragging');
}

function dragEnd(e) {
    this.classList.remove('dragging');
}

function saveList() {
    const todoHtml = document.getElementById('todo').innerHTML;
    const doingHtml = document.getElementById('doing').innerHTML;
    const doneHtml = document.getElementById('done').innerHTML;

    localStorage.setItem('listrTodo', todoHtml);
    localStorage.setItem('listrDoing', doingHtml);
    localStorage.setItem('listrDone', doneHtml);
}

function loadList() {
    const todoHtml = localStorage.getItem('listrTodo');
    const doingHtml = localStorage.getItem('listrDoing');
    const doneHtml = localStorage.getItem('listrDone');

    if (todoHtml) {
        document.getElementById('todo').innerHTML = todoHtml;
    }
    if (doingHtml) {
        document.getElementById('doing').innerHTML = doingHtml;
    }
    if (doneHtml) {
        document.getElementById('done').innerHTML = doneHtml;
    }

    document.querySelectorAll('.draggable-item').forEach(item => {
        addDeleteHandler(item.querySelector('.delete-btn'));
        addArrowHandlers(item);
    });
}
