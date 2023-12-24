import { createContext, useCallback, useEffect, useState } from "react"
import { BASE_URL, getRequest, postRequest } from "../api/index.js"

const ChatContext = createContext()

const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null)
  const [notStartedChatUsers, setNotStartedChatUsers] = useState([])
  const [targetChatData, setTargetChatData] = useState(null)
  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {

    const getUsers = async () => {
      const response = await getRequest(`${BASE_URL}/users`)

      if (response.error) {
        return console.log("Error fetching users ", response)
      }
      const excludeSelf = response.users.filter(users => users._id !== user?.data._id)

      const filterUsers = excludeSelf.filter(user =>
        !userChats?.some(chat => chat?.members?.includes(user._id)))

      setNotStartedChatUsers(filterUsers)

    }
    getUsers()
  }, [user?.data._id, userChats])

  //get user all chats
  useEffect(() => {
    const getUserChats = async () => {

      if (user?.data._id) {
        const response = await getRequest(`${BASE_URL}/chats/${user.data._id}`)

        if (response.error) {
          return console.log("Error get user's chats", response)
        }

        setUserChats(response.chats)
      }
    }
    getUserChats()
  }, [user?.data._id, userChats])

  //use chat data get user messages
  useEffect(() => {
    const getMessages = async () => {

      const response = await getRequest(`${BASE_URL}/messages/${targetChatData?._id}`)

      if (response.error) {
        return console.log("Error get messages", response)
      }
      setMessages(response.messages)
    }

    getMessages()

  }, [targetChatData])

  //send text message
  const sendTextMessageToBackend = useCallback(async (textMessage, user, targetChatData, setTextMessage) => {

    if (!textMessage) return console.log("Need to type message!")

    const response = await postRequest(`${BASE_URL}/messages`, JSON.stringify({
      chatId: targetChatData._id,
      senderId: user.data._id,
      text:textMessage
    }))
    if (response.error) {
      return console.error("Error on post message!")
    }
    console.log(response)
    setNewMessage(response.message) //get the new message
    setMessages((prev) => [...prev, response.message]) //put the new message to all messages
    setTextMessage("") //clean the input message value

  }, [])


  //target chat data
  const getTargetChatData = useCallback((chat) => {
    setTargetChatData(chat)

  }, [])

  //creat chat
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${BASE_URL}/chats`,
      JSON.stringify({
        firstId,
        secondId
      })
    )

    if (response.error) {
      return console.log("Error creating chat", response)
    }

    //回傳值確認
    setUserChats((prev) => [...prev, response.chatRoom])

  }, [])

  return (
    <ChatContext.Provider value={{
      userChats,
      notStartedChatUsers,
      createChat,
      getTargetChatData,
      targetChatData,
      messages,
      sendTextMessageToBackend
    }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export {
  ChatContext,
  ChatContextProvider
}