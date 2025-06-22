document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const themeToggle = document.getElementById('theme-toggle');
    const newSessionBtn = document.getElementById('new-session-btn');
    const sidebar = document.getElementById('sidebar');
    const sessionList = document.getElementById('session-list');
    const chatContainer = document.getElementById('chat-container');
    const inputContainer = document.getElementById('input-container');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // 主题切换
    function setTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        chatContainer.classList.toggle('dark-mode', isDark);
        chatBox.classList.toggle('dark-mode', isDark);
        inputContainer.classList.toggle('dark-mode', isDark);
        userInput.classList.toggle('dark-mode', isDark);
        sendBtn.classList.toggle('dark-mode', isDark);
    }
    let isDark = localStorage.getItem('theme') === 'dark';
    setTheme(isDark);
    themeToggle.innerText = isDark ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerText = isDark ? '☀️' : '🌙';
    });

    // 多会话管理
    let sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    let currentSessionId = localStorage.getItem('currentSessionId') || null;

    function saveSessions() {
        localStorage.setItem('sessions', JSON.stringify(sessions));
        localStorage.setItem('currentSessionId', currentSessionId);
    }
    function renderSessionList() {
        sessionList.innerHTML = '';
        sessions.forEach((session) => {
            const li = document.createElement('li');
            li.textContent = session.name || '新会话';
            li.classList.toggle('selected', session.id === currentSessionId);
            li.addEventListener('click', () => {
                currentSessionId = session.id;
                saveSessions();
                renderSessionList();
                renderChat();
            });
            sessionList.appendChild(li);
        });
    }
    function renderChat() {
        chatBox.innerHTML = '';
        const session = sessions.find(s => s.id === currentSessionId);
        if (session && session.messages) {
            session.messages.forEach(msg => displayMessage(msg.text, msg.sender));
        }
    }
    function createNewSession() {
        const id = Date.now().toString();
        const newSession = { id, name: '新会话', messages: [] };
        sessions.unshift(newSession);
        currentSessionId = id;
        saveSessions();
        renderSessionList();
        renderChat();
    }
    newSessionBtn.addEventListener('click', createNewSession);

    // 初始渲染
    if (!currentSessionId && sessions.length > 0) {
        currentSessionId = sessions[0].id;
    }
    if (sessions.length === 0) {
        createNewSession();
    }
    renderSessionList();
    renderChat();

    function updateSessionNameWithLastUserMsg(session) {
        const lastUserMsg = [...(session.messages||[])].reverse().find(m => m.sender === 'user');
        if (lastUserMsg && lastUserMsg.text) {
            session.name = lastUserMsg.text.length > 20 ? lastUserMsg.text.slice(0, 20) + '...' : lastUserMsg.text;
        } else {
            session.name = '新会话';
        }
    }

    function saveMessageToSession(text, sender) {
        const session = sessions.find(s => s.id === currentSessionId);
        if (session) {
            session.messages.push({ text, sender });
            if (sender === 'user') {
                updateSessionNameWithLastUserMsg(session);
                renderSessionList();
            }
            saveSessions();
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === '') return;
        displayMessage(messageText, 'user');
        saveMessageToSession(messageText, 'user');
        userInput.value = '';
        fetch('http://127.0.0.1:8080/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `message=${encodeURIComponent(messageText)}`
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                displayMessage(data, 'bot');
                saveMessageToSession(data, 'bot');
            })
            .catch(error => {
                console.error('Error fetching chat response:', error);
                displayMessage('Sorry, something went wrong. Please try again.', 'bot');
                saveMessageToSession('Sorry, something went wrong. Please try again.', 'bot');
            });
    }

    function displayMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        const textElement = document.createElement('div');
        textElement.classList.add('text');
        if (document.body.classList.contains('dark-mode')) {
            textElement.classList.add('dark-mode');
        }
        textElement.innerText = text;
        messageElement.appendChild(textElement);
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    clearAllBtn.addEventListener('click', () => {
        sessions = [{ id: Date.now().toString(), name: '新会话', messages: [] }];
        currentSessionId = sessions[0].id;
        saveSessions();
        renderSessionList();
        renderChat();
    });
}); 