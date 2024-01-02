import dotenv from "dotenv"
dotenv.config()
import socketIo from "./controllers/io-controllers.js"

const port = process.env.SOCKET_PORT || 4000
const clientPort = process.env.CLIENT_PORT



socketIo(clientPort).listen(port)