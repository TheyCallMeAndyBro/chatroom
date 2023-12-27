import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { BASE_URL, getRequest } from "../api"

const GetLastMessage = (chat) => {
  const { newMessage, notification } = useContext(ChatContext)
  const [lastMessage, setLastMessage] = useState(null)

  useEffect(() => {
    const getMessage = async () => {
      const response = await getRequest(`${BASE_URL}/messages/${chat?._id}`)

      if (response.error) {
        return console.log("Error get last message", response)
      }
      const lastMessage = response?.messages[response?.messages?.length - 1]
      setLastMessage(lastMessage)
    }
    getMessage()
  }, [chat?._id, newMessage, notification])
  
  return lastMessage
}


export {
  GetLastMessage
}