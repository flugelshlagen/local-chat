const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt("Enter Your Name")
appendConnection('You Joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendConnection(name + " connected")
})

socket.on('user-disconnected', name => {
  appendDisconnection(name + " disconnected")
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  sendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = " "
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList = "bg-black text-white"
  messageContainer.append(messageElement)
}

function appendConnection(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList = "bg-blue-300"
  messageContainer.append(messageElement)
}

function sendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList = "bg-white "
  messageContainer.append(messageElement)
}

function appendDisconnection(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList = "bg-red-300"
  messageContainer.append(messageElement)
}
