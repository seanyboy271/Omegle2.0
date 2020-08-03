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
            const parsed = url.parse(request.url)
            const pathname = parsed.pathname;
            const userName = parsed.query.split('=')[1]
            console.log('pathname', pathname, id, request.url)
            //console.log('id', id, pathname)
            if (pathname === `/${id}`) {
                this.wss.handleUpgrade(request, socket, head, (ws) => {
                    this.wss.emit('connection', ws, request, userName);
                });
            }
        });


        this.wss.on('connection', (ws: WebSocket, request:Request, userName:string) => {

            ws.on('message', (message: string) => {
                //Send the message to everyone in the room
                this.wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            });

            ws.on("close", (code: any, reason: any) => {
                this.wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(`${userName} left the room`);
                    }
                });
            })

            //send immediatly a feedback to the incoming connection    
            this.wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`${userName} joined the room`);
                }
            });
        });
    }


    addUser(user: User) {
        const foundUser  = this.users.find(({username}) => username === user.username)
        if (!foundUser){
            this.users.push(user)
        }
        else{
            throw new Error("Username already exists in room")
        }
 
    }

    removeUser(user: User) {
        const index  = this.users.findIndex(({username}) => { return username === user.username})
        if (index != -1){
            this.users.splice(index, 1);
        }
        else{
            throw new Error('User was not in room')
        }

        if (this.users.length == 0){
            //close the server
            console.log('closing server', this.wss)
            this.wss.close();
        }
    }

}
