const urlApi = "http://localhost:3000";

const app = new Vue({
    el: '#app',
    data() { 
        return {
            client_message: '',
            messages: [],
            pseudo: '',
            pseudoOri: 'Pseudo',
            users: [],
            isLogged: false,
            password1: '',
            password2: '',
            myFuckingState: "tchat" // tchat / login / signin
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
        },
        async loginClick() {
            const user = { 
                pseudo: this.pseudo,
                password: this.password1
            }
            console.log("je veux log", user);
            return await axios.post(urlApi + "/login", user)
        },
        async signinClick() {
            if (this.password1.length > 5) {
                if (this.password1 === this.password2) {
                    const user = { 
                        pseudo: this.pseudo,
                        password: this.password1
                    }
                    console.log("je veux sign", user);

                    const r = await axios.post(urlApi + "/signin", user);
                    if (r) {
                        console.log(r);
                    }
                }
                else {
                    console.log("not the same");
                    this.password1 = '';
                    this.password2 = '';
                }
            } 
            else {
                console.log("need > 5");
                this.password1 = '';
                this.password2 = '';
            }
        },
        goToSigninClick() {
            this.myFuckingState = "signin";
            this.pseudo = '';
            this.password1 = '';
            this.password2 = '';
        },
        goToLoginClick() {
            this.myFuckingState = "login";
            this.pseudo = '';
            this.password1 = '';
            this.password2 = '';
        }
    }
})

console.log("ready to connnect to: " + urlApi);

const socket = io(urlApi);

socket.on('new_message', (data) => {
    app.messages.push(data);
    app.refreshMsgBox();
});

socket.on('update_users', (data) => {
    app.users = data;
    if (app.messages.length !== 0) {
        app.refreshMsgBox();
    }
});
