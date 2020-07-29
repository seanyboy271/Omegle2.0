import * as WebSocket from 'ws';
import { User } from './User'
import { IncomingMessage } from 'http';
import { Socket } from 'net';
const url = require('url');

export class Room {

    private wss: WebSocket.Server;
    users: User[] = []
    id: string
    maxUsers: number


    constructor({ id, maxUsers, server }: { id: string, maxUsers: number, server: any }) {
        this.id = id;
        this.maxUsers = maxUsers
        this.wss = new WebSocket.Server({ noServer: true })

        server.on('upgrade', (request: IncomingMessage, socket: Socket, head: Buffer) => {
            const pathname = url.parse(request.url).pathname;
            console.log('id', id, pathname)
            if (pathname === `/${id}`) {
                this.wss.handleUpgrade(request, socket, head, (ws) => {
                    this.wss.emit('connection', ws, request);
                });
            }
            else {
                //Need to figure out the socket cleanup
                //console.log('socket destroy')
                //socket.destroy();
            }
        });


        this.wss.on('connection', (ws: WebSocket) => {

            ws.on('message', (message: string) => {
                //Send the message to everyone else in the room
                this.wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
                // //log the received message and send it back to the client
                console.log('received: %s', message);
                // ws.send(`Hello, you sent -> ${message}`);
            });


            //send immediatly a feedback to the incoming connection    
            ws.send('Hi there, I am a WebSocket server');
        });
    }


    addUser(user: User) {
        this.users.push(user)
    }

    removeUser(user: User) {
        if (this.users.includes(user)) {
            const index = this.users.indexOf(user);
            if (index > -1) {
                this.users.splice(index, 1);
            }
        }
    }

}
