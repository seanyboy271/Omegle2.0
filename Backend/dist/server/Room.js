"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const WebSocket = require("ws");
const url = require('url');
class Room {
    constructor({ id, maxUsers, server }) {
        this.users = [];
        this.id = id;
        this.maxUsers = maxUsers;
        this.wss = new WebSocket.Server({ noServer: true });
        server.on('upgrade', (request, socket, head) => {
            const parsed = url.parse(request.url);
            const pathname = parsed.pathname;
            const userName = parsed.query.split('=')[1];
            console.log('pathname', pathname, id, request.url);
            this.socket = socket;
            //console.log('id', id, pathname)
            if (pathname === `/${id}`) {
                this.wss.handleUpgrade(request, socket, head, (ws) => {
                    this.wss.emit('connection', ws, request, userName);
                });
            }
        });
        this.wss.on('connection', (ws, request, userName) => {
            ws.on('message', (message) => {
                //Send the message to everyone in the room
                this.wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            });
            ws.on("close", (code, reason) => {
                this.wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(`${userName} left the room`);
                    }
                });
            });
            //send immediatly a feedback to the incoming connection    
            this.wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`${userName} joined the room`);
                }
            });
        });
    }
    addUser(user) {
        const foundUser = this.users.find(({ username }) => username === user.username);
        if (!foundUser) {
            this.users.push(user);
        }
        else {
            throw new Error("Username already exists in room");
        }
    }
    removeUser(user) {
        var _a;
        const index = this.users.findIndex(({ username }) => { return username === user.username; });
        if (index != -1) {
            this.users.splice(index, 1);
        }
        else {
            throw new Error('User was not in room');
        }
        if (this.users.length == 0) {
            //close the server
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.destroy();
            console.log('closing server');
            this.wss.close();
        }
    }
}
exports.Room = Room;
//# sourceMappingURL=Room.js.map