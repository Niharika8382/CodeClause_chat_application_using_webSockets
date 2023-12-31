const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageConatiner = document.querySelector('.container');

const append = (message,postion) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(postion);
    messageConatiner.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ' ';
})

const name = prompt("enter your name to join");
socket.emit('new-user-joined',name);


socket.on('user-joined', name =>{
    append(`${name} joined the chat` , 'right');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}` , 'left');
})

socket.on('left', name =>{
    append(`${name} left the chat`,'left')
})