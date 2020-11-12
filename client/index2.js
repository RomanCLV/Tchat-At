const io = require("socket.io-client").io;
const readline = require("readline");

const PORT = 3000;
const urlApi = "http://localhost:" + PORT;

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout 
});

const socket = io(urlApi);

socket.on('announce', (message) => {
    console.log("announce: " + message + "\n");
});

socket.on('new_message', (data) => {
    process.stdout.write(data.client + " : " + data.message + "\n");
});

function loopChat() {
    rl.question("\nMessage: ", (message) => {
        if (message !== "exit") {
            socket.emit("send_message", { message });
            loopChat();
        }
    });
}

loopChat();
