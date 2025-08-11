const socket = io();

let username = null;

const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(user, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `<strong>${user}:</strong> ${text}`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function login() {
  const name = usernameInput.value.trim();
  if (!name) {
    alert('Please enter a username');
    return;
  }
  username = name;
  socket.emit('login', username);
  loginDiv.style.display = 'none';
  chatDiv.style.display = 'flex';
  messageInput.focus();
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit('message', text);
  messageInput.value = '';
  messageInput.focus();
}

socket.on('message', data => {
  addMessage(data.user, data.text);
});

loginBtn.addEventListener('click', login);
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

usernameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    login();
  }
});
