import { Server } from "socket.io"


const socketIo = (clientPort) => {
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
        io.to(user.socketId).emit("getMessage", response)
        io.to(user.socketId).emit("getNotification", {
          senderId: response.senderId,
          isRead: false,
          data: new Date()
        })
      }
    }))

    // when user disconnet update onlineUsers
    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter(users => users.socketId !== socket.id)

      io.emit("getOnlineUsers", onlineUsers)
    })
  })

  return io
}

export default socketIo
