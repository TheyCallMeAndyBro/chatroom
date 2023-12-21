import userModel from "../models/user.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwtToken from "../config/jwt.js"

const userControllers = {
  signup: async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    try {

      let user = await userModel.findOne({ email })

      if (user)
        return res.status(400).json({ message: "User already existed" })

      if (!name || !email || !password || !confirmPassword)
        return res.status(400).json({ message: "All fields are required!" })

      if (password !== confirmPassword)
        return res.status(400).json({ message: "Password don't match." })

      if (!validator.isEmail(email))
        return res.status(400).json({ message: "Email must be a valid email!" })
      // 需要真實的email

      const hashPassworded = await bcrypt.hash(password, 10)

      const data = await userModel.create({
        name,
        email,
        password: hashPassworded,
      })

      const token = jwtToken(data._id, data.email)
      res.status(200).json({ data, token })
    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body

    try {
      console.log(email, password)
      let user = await userModel.findOne({ email })

      if (!user)
        return res.status(400).json({ message: "Invalid email or password!" })

      const isValidUserPassword = await bcrypt.compare(password, user.password)

      if (!isValidUserPassword)
        return res.status(400).json({ message: "Invalid email or password!" })

      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
      }
      const token = jwtToken(data._id, data.email)
      res.status(200).json({ data, token })
    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  getUser: async (req, res) => {
    const userId = req.params.userId
    try {
      const user = await userModel.findById(userId)

      res.status(200).json({user})
    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  getUsers: async (req, res) => {

    try {
      const users = await userModel.find()

      res.status(200).json({users})
    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
}


export default userControllers