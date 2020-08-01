"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = require("./Room");
const Error_1 = require("./Error");
class RoomManager {
    constructor() {
        this.rooms = [];
    }
    createRoom(maxusers, server) {
        const newRoom = new Room_1.Room({
            id: this.generateRoomID(),
            maxUsers: maxusers,
            server: server
        });
        this.addRoom(newRoom);
        return newRoom;
    }
    addRoom(room) {
        if (!this.rooms.find(({ id }) => id === room.id)) {
            this.rooms.push(room);
        }
        else
            throw new Error(`Room ${room.id} already exists`);
    }
    removeRoom(room) {
        const index = this.rooms.findIndex(({ id }) => room.id === id);
        if (index !== -1) {
            this.rooms.splice(index, 1);
            return room;
        }
        else {
            throw new Error_1.default("Room does not exist");
        }
    }
    getRoom(roomID) {
        const room = this.rooms.find(({ id }) => id === roomID);
        if (room) {
            return room;
        }
        else {
            throw new Error_1.default("Room does not exist");
        }
    }
    getAllRooms() {
        return this.rooms;
    }
    generateRoomID() {
        //random thing
        return (Math.random() * 1e32).toString(36);
    }
    //Should work bc can only be in one room at a time
    getRoomByUser(user) {
        const room = this.rooms.find((room) => {
            if (room.users.find(({ username }) => username === user.username)) {
                return true;
            }
        });
        const userName = user.username;
        return room;
    }
}
const roomManager = new RoomManager();
Object.freeze(roomManager);
exports.default = roomManager;
//# sourceMappingURL=RoomManager.js.map