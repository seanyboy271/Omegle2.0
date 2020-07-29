"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const User_1 = require("./User");
const RoomManager_1 = require("./RoomManager");
require('dotenv').config();
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//Need a way to create rooms
// An easy way to implement this would be to create a server for every room and keep track of them
// Extract server logic to a Room class and just keep track of rooms
// ID's could be port number for now?
// Whenever someone clicks the join button, ask for a max room size and username (optional)
// Create a room with the given ID
// Could also have an option to join a random room
// Room's should have a max size
// 
//initialize a simple http server
const server = http.createServer(app);
app.post('/createRoom', (req, res) => {
    const newUser = new User_1.User(req.body.user.userName);
    const newRoom = RoomManager_1.default.createRoom(10, server);
    newRoom.addUser(newUser);
    res.send(newRoom);
});
app.get('/getRooms', (req, res) => {
    res.send(RoomManager_1.default.getAllRooms());
});
app.get('/getRoom', (req, res) => {
    const room = RoomManager_1.default.getRoom(req.params.roomID);
});
app.post('/joinRoom/:roomID', (req, res) => {
    const roomID = req.params.roomID;
    RoomManager_1.default.getRoom(roomID).addUser(req.body.user);
    res.send(roomID);
});
app.post('/leaveRoom', (req, res) => {
    console.log("leaving room");
    const room = RoomManager_1.default.getRoomByUser(req.body.user);
    room === null || room === void 0 ? void 0 : room.removeUser(req.body.user);
    if ((room === null || room === void 0 ? void 0 : room.users.length) == 0) {
        RoomManager_1.default.removeRoom(room);
    }
    //send confirmation
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started`);
});
//# sourceMappingURL=server.js.map