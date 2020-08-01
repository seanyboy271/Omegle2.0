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
            //console.log('id', id, pathname)
            if (pathname === `/${id}`) {
                this.wss.handleUpgrade(request, socket, head, (ws) => {
                    this.wss.emit('connection', ws, request, userName);
                });
            }
            else {
                //Need to figure out the socket cleanup
                //console.log('socket destroy')
                //socket.destroy();
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
                // //log the received message and send it back to the client
                console.log('received: %s', message);
                // ws.send(`Hello, you sent -> ${message}`);
            });
            //console.log(request)
            //send immediatly a feedback to the incoming connection    
            ws.send(`${userName} joined the room`);
        });
    }
    addUser(user) {
        this.users.push(user);
    }
    removeUser(user) {
        const index = this.users.findIndex(({ username }) => { return username === user.username; });
        if (index != -1) {
            this.users.splice(index, 1);
        }
        else {
            throw new Error('User was not in room');
        }
    }
}
exports.Room = Room;
//# sourceMappingURL=Room.js.map