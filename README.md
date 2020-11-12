# Tchat-At
Tchat server with MongoDB and NodeJS

# Client
```
npm install
npm start
```

Individual install
```
npm install --save socket.io-client
npm install vue
```

# Server
```
npm install
nodemon index.js
```

Individual install
```
npm install --save socket.io
npm install --save-dev nodemon
npm install --save express
npm install --save cors
```

# Projet NoSQL - Le TChat

## Le tchat - Critères d'acceptation

- Chaque utilisateur doit etre authentifie avant de pouvoir utiliser le tchat
- Plusieurs salons de discussions sont disponible (#general, #annonces, ..)
- On peut creer son propre canal de discussion #jeveuxmoncanal (tout le monde peut rejoindre)
- Système de message privé
- Recevoir les messages non-lus lorsqu'on se connecte a nouveau
- Avoir un petit historique de chaque canal de discussion accessible. (Ou lorsqu'on le rejoint)

BONUS
- Pouvoir choisir si le canal est privé/publique lorsqu'on cree un canal #jeveuxmoncanal
- Creer des "sous-serveurs" / discord-like 

RAPPEL
- Front séparé du back ! Focus sur le back svp

### Sécurité, Simplicité, Maintenabilité