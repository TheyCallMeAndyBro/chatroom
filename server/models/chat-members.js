import mongoose from "mongoose"

const chatMembersSchema = new mongoose.Schema({
  members: Array
},
  {
    timestamps: true,
  }
)

const chatMembersModel = mongoose.model("ChatMembers", chatMembersSchema)

export default chatMembersModel