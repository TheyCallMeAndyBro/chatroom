import express from "express"
import userControllers from "../../controllers/user-controllers.js"

const router = express.Router()

router.post('/signup', userControllers.signup)
router.post('/signin', userControllers.signin)
router.get('/find/:userId', userControllers.getUser)
router.get('/', userControllers.getUsers)

export default router