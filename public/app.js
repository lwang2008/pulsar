const socket = io();

joined = false;

messageInput = document.getElementById("message")
nameInput = document.getElementById("nameInput")
nameView = document.getElementById("viewName")
messasages = document.getElementById("messages")
userList = document.getElementById("connectedUsers")

nameInput.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        nameView.innerHTML = "<b>" + nameInput.value + "</b>"
        if (joined) {
            socket.emit('setName', nameInput.value)
        } else {
            joined = true
            socket.emit("join", nameInput.value)
        }
    }
})

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on("userJoined", (name, id) => {
    const el = document.createElement('li');
    el.innerHTML = `<b>${name}</b>: ${id}`;
    userList.appendChild(el)
})

socket.on('receive', (username, message) => {

    const el = document.createElement('li');
    el.innerHTML = `<b>${username}</b>: ${message}`;
    messasages.appendChild(el)

});





messageInput.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        socket.emit("send", messageInput.value)
        messageInput.value = ""
    }

    
    
})

