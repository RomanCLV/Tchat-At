const SocketIoServer = require("socket.io").Server;
const store = require("./store/store.js");

const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new SocketIoServer(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    }
});

const PORT = 3000;

io.on('connection', (socket_client) => {
    console.log('Client connected', socket_client.id);
    store.users.add(socket_client.id);
    const users = store.users.get();
    socket_client.emit('update_users', users);
    socket_client.broadcast.emit('update_users', users);

    socket_client.on('send_message', (data) => {
        const { message } = data;
        const package_msg = {
            message,
            date: + new Date(),
            client: socket_client.id
        };
        socket_client.emit('new_message', package_msg);
        socket_client.broadcast.emit('new_message', package_msg);
    });

    socket_client.on('set_pseudo', (data) => {
        if (store.users.setPseudo(socket_client.id, data.pseudo)) {
            const users = store.users.get();
            socket_client.emit('update_users', users);
            socket_client.broadcast.emit('update_users', users);
        }
    });
})

server.listen(PORT, () => {
    console.log("\nListen on port: " + PORT + "\n");
});
