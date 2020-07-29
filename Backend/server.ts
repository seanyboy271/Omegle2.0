
import * as express from 'express';
import * as http from 'http';
import { Room } from './Room';
import { User } from './User';
import roomManager from './RoomManager';



require('dotenv').config()
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

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
    const newUser = new User(req.body.user.userName);
    const newRoom = roomManager.createRoom(10, server);
    newRoom.addUser(newUser);
    console.log("USers in new room", newRoom)
    res.send(newRoom);
})

app.get('/getRooms', (req, res) => {
    res.send(roomManager.getAllRooms());
})

app.get('/getRoom', (req, res) => {
    const room = roomManager.getRoom(req.params.roomID)
    console.log("room result", room)
    res.send(room)
})


app.post('/joinRoom/:roomID', (req, res) => {
    console.log("Joining room", req.params.roomID)
    const roomID = req.params.roomID
    roomManager.getRoom(roomID).addUser(req.body.user)
    res.send(roomID)
})


//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started`);
});