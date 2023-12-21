import chatMembersModel from "../models/chat-members.js"

const chatControllers = {
  createChat: async (req, res) => {
    const { firstId, secondId } = req.body

    try {
      const chatRoom = await chatMembersModel.findOne({
        members: { $all: [firstId, secondId] }
      })

      if (chatRoom) return res.status(200).json({ chatRoom })

      const newChatRoom = await chatMembersModel.create({
        members: [firstId, secondId]
      })

      res.status(200).json({ newChatRoom })

    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  getUserChats: async (req, res) => {
    const userId = req.params.userId

    try {
      const chats = await chatMembersModel.find({
        members: { $in: [userId] }
      })
      res.status(200).json({ chats })
    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  getUserChatDetail: async (req, res) => {
    const { firstId, secondId } = req.params

    try {
      const chat = await chatMembersModel.findOne({
        members: { $all: [firstId, secondId] }
      })
      res.status(200).json({ chat })
    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
}

export default chatControllers