import { Stack } from "react-bootstrap"
import { GetChatUserHelper } from "../../helper/getChatUser-helper"
import avatar from "../../assets/avatar.svg"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { unreadNotification } from "../../helper/getNotification-helper.js"
import { GetLastMessage } from "../../helper/getLastMessage.js"
import moment from "moment"

const UserChat = ({ chat, user }) => {
  const getChatUser = GetChatUserHelper(chat, user)
  const { onlineUsers, notification, individualUnreadNotificationAsRead } = useContext(ChatContext)

  const isOnlineChatUser = onlineUsers?.some(user => user.userId === getChatUser?.user._id)
  const unreadNotifications = unreadNotification(notification)
  const individualUnreadNotification = unreadNotifications?.filter(notification => notification?.senderId === getChatUser?.user?._id)

  const lastMessage = GetLastMessage(chat)
  const cutLastMessage = (text) => {
    let shortText
    if (text.length > 10) {
      shortText = text.substring(0, 10) + "..."
    }
    else {
      shortText = text
    }
    return shortText
  }

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (individualUnreadNotification?.length > 0) {
          individualUnreadNotificationAsRead(individualUnreadNotification, unreadNotifications)
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} alt="avatar" height="40px" />
        </div>
        <div className="text-content">
          <div className="name">{getChatUser?.user.name}</div>
          <div className="text">{lastMessage?.text ? cutLastMessage(lastMessage?.text) : ""}</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="data">{moment(lastMessage?.createdAt).calendar()}</div>
        <div className={
          individualUnreadNotification?.length > 0 ? "this-user-notifications" : ""
        }
        >
          {
            individualUnreadNotification?.length > 0 ? individualUnreadNotification?.length : ""
          }
        </div>
        <div className={isOnlineChatUser ? "user-online" : ""}></div>
      </div>
    </Stack>
  )
}

export default UserChat
