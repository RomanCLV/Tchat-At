const SocketIoServer = require("socket.io").Server;
const store = require("./store/store.js");
const middlewares = require('./middlewares');
const router = require('./router/router');
const express = require('express');
const http = require('http');
const cors = require('cors');
const createHandlers = require('./handlers/PacketHandlers');

const root = "../client";
const app = express();

app.use(express.json());                            // body-parser
app.use(express.urlencoded({ extended: true }));    // body-parser


app.use(cors());
app.use(express.static(root));
app.use(middlewares.printHello);
app.use(router);

const server = http.createServer(app);
const io = new SocketIoServer(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket_client) => {
    console.log('Client connected', socket_client.id);
    
    const handlers = createHandlers(io, socket_client);
    socket_client.on('set_pseudo', handlers.SetPseudo);
    socket_client.on('send_message', handlers.SendMessage);
    
    store.users.add(socket_client.id);
    const users = store.users.get();
    socket_client.emit('update_users', users);
    socket_client.broadcast.emit('update_users', users);
})

server.listen(PORT, () => {
    console.log("\nListen on port: " + PORT + "\n");
});
