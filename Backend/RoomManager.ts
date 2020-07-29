import { Room } from './Room'
import e = require('express');
import { User } from './User';


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
        if (!this.rooms.includes(room)) {
            this.rooms.push(room)
            console.log('room added')
        }
        else
            throw new Error(`Room ${room.id} already exists`)

    }

    removeRoom(room: Room): Room {
        const index = this.rooms.indexOf(room);
        if (index > -1) {
            this.rooms.splice(index, 1);
            return room
        }


        else {
            throw new Error("Room does not exist")
        }


    }

    getRoom(roomID: string): Room {

        const room = this.rooms.find(({id}) => id === roomID)
        if(room){
            return room
        }
        else{
            throw new Error("Room does not exist")
        }
        
    }

    getAllRooms(): Room[] {
        return this.rooms
    }

    generateRoomID() {
        //random thing
        return (Math.random() * 1e32).toString(36)
    }


}

const roomManager = new RoomManager();
Object.freeze(roomManager);

export default roomManager;