import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { GetChatUserHelper } from "../../helper/getChatUser-helper"
import { Stack } from "react-bootstrap"
import moment from "moment"
import InputEmoji from "react-input-emoji"

const ChatBox = () => {
  const { user } = useContext(AuthContext)
  const { targetChatData, messages, sendTextMessageToBackend } = useContext(ChatContext)
  const getChatUser = GetChatUserHelper(targetChatData, user)
  const [textMessage, setTextMessage] = useState("")
  const chatBoxScroll = useRef()

  // put message to chatBoxScroll and use scrollIntoView scroll to the new message
  useEffect(() => {
    console.log("123", chatBoxScroll.current)
    chatBoxScroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!getChatUser) return (
    <p className="text-center" style={{ width: "100%", fontSize: '36px' }}>
      No converstation selected yet !
    </p>
  )
  return (
    <Stack gap={3} className="chat-box">
      <div className="chat-header">
        <strong>{getChatUser.user.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages && messages.map((messages, index) => {
          return (
            <Stack key={index} className={`${messages?.senderId === user?.data._id
              ? "message self align-self-end flex-grow-0"
              : "message align-self-start flex-grow-0"
              }`}
              ref={chatBoxScroll}
            >
              <span>{messages.text}</span>
              <span className="message-footer">
                {moment(messages.createdAt).calendar()}
              </span>
            </Stack>
          )
        })}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji value={textMessage} onChange={setTextMessage} />
        <button className="send-btn" onClick={() => sendTextMessageToBackend(textMessage, user, targetChatData, setTextMessage)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </Stack>
    </Stack>

  )
}

export default ChatBox