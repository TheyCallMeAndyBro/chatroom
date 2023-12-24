import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"
import { Container, Stack } from "react-bootstrap"
import UserChat from "../components/chat/UserChat"
import NotStartedChats from "../components/chat/NotStartedChats"
import ChatBox from "../components/chat/ChatBox"

const Chat = () => {
  const { user } = useContext(AuthContext)
  const { userChats, getTargetChatData } = useContext(ChatContext)

  return (
    <Container>
      <NotStartedChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => getTargetChatData(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              )
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  )
}

export default Chat
