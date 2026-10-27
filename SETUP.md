# Quick Start (VS Code)

1. Unzip and open the `campus-marketplace` folder in VS Code (File > Open Folder).
2. Open the terminal (Ctrl + `). You will use TWO terminals: one for server, one for client.

## Terminal 1 - Server
```
cd server
npm install
copy .env.example .env        (Windows)   |   cp .env.example .env   (Mac/Linux)
```
Open `server/.env` and set:
- MONGO_URI  -> your MongoDB Atlas connection string
- JWT_SECRET -> any long random text

Then:
```
npm run dev
```
You should see: `MongoDB connected`.

## Terminal 2 - Client
```
cd client
npm install
copy .env.example .env        (Windows)   |   cp .env.example .env   (Mac/Linux)
npm run dev
```
Open http://localhost:5173
