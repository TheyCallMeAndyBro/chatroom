import { useEffect, useState } from "react"
import { BASE_URL, getRequest } from "../api"

//get participant data
const GetChatUserHelper = (chat, user) => {
  const [getChatUser, setGetChatUser] = useState(null)

  const chatUserId = chat?.members?.find((chatUserId) => chatUserId !== user?.data._id)
  //participant Id

  useEffect(() => {
    const getUser = async () => {

      if (!chatUserId) return null

      const response = await getRequest(`${BASE_URL}/users/find/${chatUserId}`)

      if (response.error) {
        return console.log("Error fetching participant user", response)
      }

      setGetChatUser(response)
    }

    getUser()
  }, [chatUserId])

  return getChatUser
}

export {
  GetChatUserHelper
}