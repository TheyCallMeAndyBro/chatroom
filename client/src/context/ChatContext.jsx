import { createContext, useCallback, useEffect, useState } from "react"
import { BASE_URL, getRequest, postRequest } from "../api/index.js"
import { io } from "socket.io-client"
const ChatContext = createContext()
const socketServerPort = process.env.SOCKET_SERVER_PORT || 4000

const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null)
  const [notStartedChatUsers, setNotStartedChatUsers] = useState([])
  const [targetChatData, setTargetChatData] = useState(null)
  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  //connect socket server
  useEffect(() => {
    const newSocket = io(`http://localhost:${socketServerPort}`)
    setSocket(newSocket)

    return () => { //cleanup  function
      newSocket.disconnect()
    }
  }, [user])

  //add online users
  useEffect(() => {
    if (socket === null) return
    socket.emit("addNewUser", user?.data._id)
    socket.on("getOnlineUsers", (res) => {

      setOnlineUsers(res)
    })

    return () => {
      socket.off("getOnlineUsers")
    }
  }, [socket, user?.data._id])

  //send message to socket server
  useEffect(() => {
    if (socket === null) return
    const chatUserId = targetChatData?.members?.find(targetChatUserId => targetChatUserId !== user?.data._id)

    socket.emit("sendMessage", { ...newMessage, chatUserId })
  }, [socket, newMessage, targetChatData, user?.data._id])

  //get server socket message
  useEffect(() => {
    if (socket === null) return

    socket.on("getmessage", response => {
      if (targetChatData?._id === response.chatId) {

        setMessages(prev => [...prev, response])
      }
    })

    return () => {
      socket.off("getmessage")
    }
  }, [socket, targetChatData])

  //get not startedChatUsers
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
      text: textMessage
    }))
    if (response.error) {
      return console.error("Error on post message!")
    }
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
      sendTextMessageToBackend,
      onlineUsers
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