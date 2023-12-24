import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"

const NotStartedChats = () => {
  const { user } = useContext(AuthContext)
  const { notStartedChatUsers, createChat } = useContext(ChatContext)

  return (
    <>
      <div className="all-users">
        {notStartedChatUsers && 
        notStartedChatUsers.map((users, index) => {
          return (
            <div className="single-user" key={index} onClick={() => createChat(user?.data._id, users._id)}>
              {users.name}
              <span className="user-online"></span>
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default NotStartedChats
