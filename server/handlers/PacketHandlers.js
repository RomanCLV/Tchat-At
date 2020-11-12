const store = require('../store/store');

function createHandlers(io, socket_client) {

    const SetPseudo = (data) => {
        if (store.users.setPseudo(socket_client.id, data.pseudo)) {
            const users = store.users.get();
            socket_client.emit('update_users', users);
            socket_client.broadcast.emit('update_users', users);
        }
    }

    const SendMessage = (data) => {
        const { message } = data;
        const package_msg = {
            message,
            date: + new Date(),
            client: socket_client.id
        };
        socket_client.emit('new_message', package_msg);
        socket_client.broadcast.emit('new_message', package_msg);
    }

    return {
        SendMessage,
        SetPseudo
    }
}

module.exports = createHandlers