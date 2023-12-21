import express from "express"
import users from "./modules/user.js"

const router = express.Router()

router.use("/users", users)


export default router