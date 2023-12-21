import express from "express"
import users from "./modules/user.js"
import chats from "./modules/chat.js"

const router = express.Router()

router.use("/users", users)
router.use("/chats", chats)


export default router