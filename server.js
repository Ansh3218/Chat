require('dotenv').config();
const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

// Middleware static file
app.use(express.static('public'));

////// Server Listning //////
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

//!!! Routing !!!//

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

/// Socket

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})