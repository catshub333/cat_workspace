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

    // Load conversation logs if a conversation panel exists.
    const convoPanel = document.getElementById('conversation-log');
    if (convoPanel) {
        const convo = JSON.parse(localStorage.getItem('conversation-log') || '[]');
        convoPanel.innerHTML = '';
        convo.forEach(entry => {
            const p = document.createElement('p');
            p.textContent = entry;
            convoPanel.appendChild(p);
        });
    }
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

// Voice input using Web Speech API
function startDictation() {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Speech recognition is not supported in this browser.');
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const textarea = document.getElementById('comment-input');
        textarea.value = textarea.value ? textarea.value + ' ' + transcript : transcript;
    };
    recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
    };
    recognition.start();
}

document.addEventListener('DOMContentLoaded', loadTasks);
