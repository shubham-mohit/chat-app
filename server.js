const express = require("express")
const { Socket } = require("socket.io")
const app = express()

const http = require('http').createServer(app)
const socketio = require('socket.io')(http)

const PORT = process.env.PORT || 3000

// app.use('/')

http.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
})


socketio.on('connection', (socket) =>{
    console.log('socket connected')

    socket.on('message', (msg) => {
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })

})