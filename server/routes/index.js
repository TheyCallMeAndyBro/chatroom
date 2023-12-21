import express from "express"
import users from "./modules/user.js"
import chats from "./modules/chat.js"
import messages from "./modules/message.js"

const router = express.Router()

router.use("/users", users)
router.use("/chats", chats)
router.use("/messages", messages)

export default router