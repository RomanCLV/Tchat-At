class Store {
    constructor() {
        this.content = [];
    }

    get() {
        return this.content;
    }

    add(userID) {
        const r = Math.floor(Math.random() * Math.floor(256));
        const g = Math.floor(Math.random() * Math.floor(256));
        const b = Math.floor(Math.random() * Math.floor(256));

        const newUser = { 
            id: userID, 
            color: '#' + (r * g * b).toString(16), 
            pseudo: userID 
        };
        this.content.push(newUser);
        return newUser;
    }

    setPseudo(id, pseudo) {
        const user = this.content.find(value => value.id == id);
        if (user) {
            const index = this.content.indexOf(user);
            this.content[index].pseudo = pseudo;
            return true;
        }
        return false;
    }
}

exports.Store = Store;
