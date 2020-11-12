# Tchat-At
Tchat server with MongoDB and NodeJS

# Client
```
cd client
npm install
npm start
```

Individual install
```
npm install --save socket.io-client
npm install vue
npm install --save axios
```

# DataBase
```
cd server
(créer le dossier data dans server/db)
créer la db (new terminal) :
- mongo
- use TchatAt
- db.createCollection("users")
- db.createCollection("servers")
- db.createCollection("rooms")

mongod --dbpath ./db/data
```

# Server
```
cd server
npm install
nodemon index.js
```

Individual install
```
npm install --save socket.io
npm install --save-dev nodemon
npm install --save express
npm install --save cors
npm install --save mongodo
npm install --save dotenv
```

# Projet NoSQL - Le TChat

## Le tchat - Critères d'acceptation

- Chaque utilisateur doit etre authentifie avant de pouvoir utiliser le tchat
- Plusieurs salons de discussions sont disponible (#general, #annonces, ..)
- On peut creer son propre canal de discussion #jeveuxmoncanal (tout le monde peut rejoindre)
- Syst�me de message priv�
- Recevoir les messages non-lus lorsqu'on se connecte a nouveau
- Avoir un petit historique de chaque canal de discussion accessible. (Ou lorsqu'on le rejoint)

BONUS
- Pouvoir choisir si le canal est priv�/publique lorsqu'on cree un canal #jeveuxmoncanal
- Creer des "sous-serveurs" / discord-like 

RAPPEL
- Front s�par� du back ! Focus sur le back svp

### S�curit�, Simplicit�, Maintenabilit�