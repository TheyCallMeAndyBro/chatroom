import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import router from "./routes/index.js"

const app = express()
dotenv.config()
const port = process.env.PORT || 5000
const ATLAS_URI = process.env.ATLAS_URI

app.use(express.json())
app.use(cors())
app.use("/api", router)

app.get("/",)

app.listen(port, () => {
  console.info(`Server Running on Port ${port}`)
})


mongoose.connect(ATLAS_URI)
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed:", error.message))