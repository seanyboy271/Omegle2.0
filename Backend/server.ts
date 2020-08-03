
import * as express from 'express';
import * as http from 'http';
import { Room } from './Room';
import { User } from './User';
import roomManager from './RoomManager';
import NotFoundError from './Error';



require('dotenv').config()
const app = express();

const path = require('path');
const distDir = path.join(__dirname, '../../../', 'Frontend', 'build')
console.log(distDir)

app.use(express.static(distDir))

app.get('*', (request, response) => {
	response.sendFile(path.join(distDir, 'index.html'));
});

var cors = require('cors')

app.use(cors())

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

app.post('/api/createRoom', (req, res) => {
    const newUser = new User(req.body.user.userName);
    const newRoom = roomManager.createRoom(10, server);
    newRoom.addUser(newUser);
    res.send(newRoom);
})

app.get('/api/getRooms', (req, res) => {
    res.send(roomManager.getAllRooms());
})

app.get('/api/getRoom', (req, res) => {
    const room = roomManager.getRoom(req.params.roomID)
})

app.post('/api/getRoomByUser', (req, res) => {
    const room = roomManager.getRoomByUser(req.body.user)
    console.log("ROOM GROMASDILAJSD:KPOAS", room)
    res.send( room || false)
})

app.post('/api/joinRoom/:roomID', (req, res, next) => {
    const roomID = req.params.roomID
    roomManager.getRoom(roomID).addUser(req.body.user)
    res.send(roomID)
})

app.post('/api/leaveRoom', (req, res) => {
    console.log("leaving room")
    const room = roomManager.getRoomByUser(req.body.user)
    room?.removeUser(req.body.user)
    if (room?.users.length == 0) {
        roomManager.removeRoom(room)
    }
    //send confirmation
})

app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof NotFoundError) {
        res.status(err.status).send(err.message)
    }
    else{
        res.status(500).send(err)
    }
})



//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started`);
});