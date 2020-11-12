const urlApi = "http://localhost:3000";

console.log("ready to connnect to: " + urlApi);

const socket = io(urlApi);

socket.on('new_message', (data) => {
    app.messages.push(data);
    app.refreshMsgBox();
})

socket.on('update_users', (data) => {
    app.users = data;
    if (app.messages.length !== 0) {
        app.refreshMsgBox();
    }
})

const app = new Vue({
    el: '#app',
    data() { 
        return {
            client_message: '',
            messages: [],
            pseudo: '',
            pseudoOri: 'Pseudo',
            users: []
        };
    },
    methods: {
        sendMessage() {
            socket.emit('send_message', { message: this.client_message });
            this.client_message = '';
        },
        setPseudo() {
            if (this.pseudo.length !== 0) {
                socket.emit('set_pseudo', { pseudo: this.pseudo });
                this.pseudoOri = this.pseudo;
                this.pseudo = '';
            }
        },
        refreshMsgBox() {
            const msgBox = document.getElementById("msgBox");
            while (msgBox.firstChild) {
                msgBox.removeChild(msgBox.lastChild);
            }

            for (let message of this.messages) {
                const user = this.users.find(value => value.id === message.client);

                const p = document.createElement('p');

                const date = document.createElement('span');
                date.setAttribute('class', 'date');

                const dt = new Date(message.date);
                
                date.textContent = `[${dt.getDay()}/${dt.getMonth()}/${dt.getFullYear()} - ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}] `;

                const usr = document.createElement('span');
                usr.textContent = `${user.pseudo} : `;
                usr.style.color = user.color;

                const msg = document.createElement('span');
                msg.textContent = message.message;

                p.appendChild(date);
                p.appendChild(usr);
                p.appendChild(msg);
                msgBox.appendChild(p);
            }
        }
    }
})