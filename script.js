function loadTasks() {
    ['general','workout','diet'].forEach(type => {
        const tasks = JSON.parse(localStorage.getItem(type + '-tasks') || '[]');
        const list = document.getElementById(type + '-list');
        list.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            list.appendChild(li);
        });
    });
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';
    comments.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        commentsDiv.appendChild(p);
    });
}

function addTask(type) {
    const input = document.getElementById(type + '-input');
    const value = input.value.trim();
    if (value) {
        const tasks = JSON.parse(localStorage.getItem(type + '-tasks') || '[]');
        tasks.push(value);
        localStorage.setItem(type + '-tasks', JSON.stringify(tasks));
        input.value = '';
        loadTasks();
    }
}

function saveComment() {
    const textarea = document.getElementById('comment-input');
    const value = textarea.value.trim();
    if (value) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.push(value);
        localStorage.setItem('comments', JSON.stringify(comments));
        textarea.value = '';
        loadTasks();
    }
}

document.addEventListener('DOMContentLoaded', loadTasks);
