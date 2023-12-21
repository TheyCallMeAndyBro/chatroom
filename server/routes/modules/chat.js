import express from "express"
import chatControllers from "../../controllers/chat-controllers.js"

const router = express.Router()

router.post("/", chatControllers.createChat)
router.get("/:userId", chatControllers.getUserChats)
router.get("/chatDetail/:firstId/:secondId", chatControllers.getUserChatDetail)

export default router