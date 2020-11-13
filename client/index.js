const urlApi = "http://localhost:3000";

const app = new Vue({
    el: '#app',
    data() { 
        return {
            isLogged: false,
            pseudo: '',
            password1: '',
            password2: '',
            status: "tchat", // tchat / login / signin
            msg_error: '',
            client_message: '',
            messages: [],
            user: null,
            users: [],
            servers: [],
            rooms: [],
            selectedServer: null,
            selectedRoom: null
        };
    },
    methods: {
        sendMessage() {
            if (this.isLogged && this.client_message.length > 0) {
                socket.emit('send_message', { message: this.client_message });
                this.client_message = '';
            }
        },
        refreshServer() {
            const listServers = document.getElementById("listServers");
            while (listServers.firstChild) {
                listServers.removeChild(listServers.lastChild);
            }
            for (let server of this.servers) {
                const li = document.createElement('li');
                li.addEventListener("click", this.goToServer); //where func is your function name
                li.textContent = server.name;
                listServers.appendChild(li);
            }
        },
        refreshRoom() {
            const listRooms = document.getElementById("listRooms");
            while (listRooms.firstChild) {
                listRooms.removeChild(listRooms.lastChild);
            }
            for (let room of this.rooms) {
                const li = document.createElement('li');
                li.addEventListener("click", this.goToRoom); //where func is your function name
                li.textContent = room.name;
                li["data-room"] = room.id;
                listRooms.appendChild(li);
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
        logOutClick() {
            this.pseudo = '';
            this.password1 = '';
            this.password2 = '';
            this.msg_error = '';
            this.status = "login";
            this.isLogged = false;
        },
        async loginClick() {
            if (this.pseudo.length > 0) {
                if (this.password1.length > 5) {
                    
                    const user = { 
                        pseudo: this.pseudo,
                        password: this.password1
                    }
                    let r = await axios.post(urlApi + "/login", user)
                    if (r) {
                        if (r.data.msg === "success") {
                            this.status = 'tchat';
                            this.user = r.data.user;
                            this.isLogged = true;
                            this.msg_error = '';

                            r = await axios.get(urlApi + "/server");
                            if (r) {
                                if (r.data.msg === "success") {
                                    this.servers = r.data.servers;
                                    this.refreshServer();
                                }
                                else {
                                    this.servers = [];
                                }
                            }
                            else {
                                console.log("serv: no rep");
                            }
                        }
                        else {
                            this.msg_error = r.data.msg;
                            this.pseudo = '';
                            this.password1 = '';
                            this.password2 = '';
                        }
                    }
                    else {
                        console.log("log - no result");
                        this.msg_error = "no result";
                        this.pseudo = '';
                        this.password1 = '';
                        this.password2 = '';
                    }
                } 
                else {
                    this.msg_error = "password length need to be > 5";
                    this.password1 = '';
                }
            }
            else {
                this.msg_error = "pseudo length need to be > 0";
            }

            
        },
        async signinClick() {
            if (this.pseudo.length > 0) {
                if (this.password1.length > 5) {
                    if (this.password1 === this.password2) {
                        const user = { 
                            pseudo: this.pseudo,
                            password: this.password1
                        }
    
                        const r = await axios.post(urlApi + "/signin", user);
                        if (r) {
                            if (r.data.msg === "success") {
                                this.status = 'login';
                                this.pseudo = '';
                                this.password1 = '';
                                this.password2 = '';
                                this.msg_error = '';
                            }
                            else {
                                this.msg_error = r.data.msg;
                                this.pseudo = '';
                                this.password1 = '';
                                this.password2 = '';
                            }
                        }
                        else {
                            console.log("sign - no result");
                            this.msg_error = "no result";
                            this.pseudo = '';
                            this.password1 = '';
                            this.password2 = '';
                        }
                    }
                    else {
                        this.msg_error = "password are not the same";
                        this.password1 = '';
                        this.password2 = '';
                    }
                } 
                else {
                    this.msg_error = "password length need to be > 5";
                    this.password1 = '';
                    this.password2 = '';
                }
            }
            else {
                this.msg_error = "pseudo length need to be > 0";
            }
        },
        goToSigninClick() {
            this.status = "signin";
            this.pseudo = '';
            this.password1 = '';
            this.password2 = '';
            this.msg_error = '';
        },
        goToLoginClick() {
            this.status = "login";
            this.pseudo = '';
            this.password1 = '';
            this.password2 = '';
            this.msg_error = '';
        },
        async goToServer(sender) {
            const serverName = sender.target.textContent;
            let uri = urlApi + "/server/" + serverName;
            const server = await axios.post(uri, { server: serverName });
            if (server) {
                if (server.data.msg === "success") {
                    this.selectedServer = server.data.server;
                    this.msg_error = '';
                    if (this.selectedServer.rooms.length > 0) {
                        this.rooms = [];
                        await this.findRooms();
                    }
                } 
                else {
                    this.msg_error = server.data.msg;
                }
            }
            else {
                this.msg_error = "error to find the server!";
            }
        },
        async findRooms() {
            let theFirstRoom = null;
            for (let roomId of this.selectedServer.rooms) {
                const uri = urlApi + "/server/" + this.selectedServer.name + "/room/" + roomId;
                const room = await axios.post(uri, { roomId: roomId });
                if (room) {
                    if (room.data.msg === "success") {
                        this.msg_error = '';
                        if (theFirstRoom === null) {
                            this.selectedRoom = room.data.room;
                        }
                        this.rooms.push({name: room.data.room.name, id: roomId});
                    }
                    else {
                        this.msg_error = server.data.msg;
                    }
                }
                else {
                    this.msg_error = "error to find the room!";
                }
            }
            this.refreshRoom();
        },
        async goToRoom(sender) {
            const roomName = sender.target.textContent;
            const id = sender.target["data-room"];
            const uri = urlApi + "/server/" + this.selectedServer.name + "/room/" + id;
            console.log("goToRoom:", uri);
            this.selectedRoom = roomName;
            const room = await axios.post(uri, { room: roomName });
            if (room) {
                if (room.data.msg === "success") {
                    this.selectedRoom = room.data.room;
                    this.selectedRoom.messages
                    this.msg_error = '';
                }
                else {
                    this.msg_error = room.data.msg;
                }
            }
            else {
                this.msg_error = "error!";
            }
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
