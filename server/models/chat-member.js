import mongoose from "mongoose"

const chatMemberSchema = new mongoose.Schema({
  members: Array
},
  {
    timestamps: true,
  }
)

const chatMemberModel = mongoose.model("ChatMember", chatMemberSchema)

export default chatMemberModel