import { Room } from './Room'
import e = require('express');
import { User } from './User';
import NotFoundError from './Error'


class RoomManager {

    private rooms: Room[];

    constructor() {
        this.rooms = []
    }

    createRoom(maxusers: number, server: any) {
        const newRoom = new Room({
            id: this.generateRoomID(),
            maxUsers: maxusers,
            server: server
        });

        this.addRoom(newRoom)

        return newRoom
    }

    addRoom(room: Room) {
        if (!this.rooms.find(({ id }) => id === room.id)) {
            this.rooms.push(room)
        }
        else
            throw new Error(`Room ${room.id} already exists`)

    }

    removeRoom(room: Room): Room {
        const index = this.rooms.findIndex(({ id }) => room.id === id);
        if (index !== -1) {
            this.rooms.splice(index, 1);
            return room
        }

        else {
            throw new NotFoundError("Room does not exist")
        }

    }

    getRoom(roomID: string): Room {

        const room = this.rooms.find(({ id }) => id === roomID)
        if (room) {
            return room
        }
        else {
            throw new NotFoundError("Room does not exist")
        }

    }

    getAllRooms(): Room[] {
        return this.rooms
    }

    generateRoomID() {
        //random thing
        return (Math.random() * 1e32).toString(36)
    }

    //Should work bc can only be in one room at a time
    getRoomByUser(user: User) {
        const room = this.rooms.find((room) => {
            if (room.users.find(({ username }) => username === user.username)){
                return true
            }
        })
        const userName = user.username
        return room
    }


}

const roomManager = new RoomManager();
Object.freeze(roomManager);

export default roomManager;