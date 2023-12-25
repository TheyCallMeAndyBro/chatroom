import { Server } from "socket.io";
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 4000
const clientPort = process.env.CLIENT_PORT
const io = new Server({ cors: `http://localhost:${clientPort}` })

let onlineUsers = []

io.on("connection", (socket) => {
  console.log("new connection", socket.id)

  //listener
  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id
      })
    }
    io.emit("getOnlineUsers", onlineUsers)
  })

  //add message
  socket.on("sendMessage", (response => {

    const user = onlineUsers.find(users => users.userId === response.chatUserId)
// check is user onilne
  
    if (user) {
      io.to(user.socketId).emit("getmessage", response)
    }
  }))

  // when user disconnet update onlineUsers
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(users => users.socketId !== socket.id)

    io.emit("getOnlineUsers", onlineUsers)
  })
})

io.listen(port)