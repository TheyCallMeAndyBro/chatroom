import { Stack } from "react-bootstrap"
import { GetChatUserHelper } from "../../helper/getChatUser-helper"
import avatar from "../../assets/avatar.svg"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"

const UserChat = ({ chat, user }) => {
  const getChatUser = GetChatUserHelper(chat, user)
  const { onlineUsers } = useContext(ChatContext)
  const isOnlineChatUser = onlineUsers?.some(user => user.userId === getChatUser?.user._id)

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} alt="avatar" height="40px" />
        </div>
        <div className="text-content">
          <div className="name">{getChatUser?.user.name}</div>
          <div className="text">123</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="data">12/12/12</div>
        <div className="this-user-notifications">2</div>
        <div className={isOnlineChatUser ? "user-online" : ""}></div>
      </div>
    </Stack>
  )
}

export default UserChat
