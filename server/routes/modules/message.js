import express from "express"
import messageControllers from "../../controllers/message-controllers.js"

const router = express.Router() 

router.post("/", messageControllers.createMessage)
router.get("/:chatId", messageControllers.getMessages)


export default router