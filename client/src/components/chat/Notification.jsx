import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { unreadNotification } from "../../helper/getNotification-helper.js"
import moment from "moment"


const Notification = () => {

  const [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext)
  const { notification, userChats, allUsers, markAllNotificationAsRead, getChatWithNotification } = useContext(ChatContext)

  const unreadNotifications = unreadNotification(notification)
  const modifiedNotifications = unreadNotifications.map(unreadNotifications => {
    const sender = allUsers.find(users => users._id === unreadNotifications.senderId)

    return {
      ...unreadNotifications,
      senderName: sender?.name
    }
  })

  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2" />
        </svg>
        {unreadNotifications?.length === 0
          ? null
          : (<span className="notification-count">
            <span>{unreadNotifications?.length}</span>
          </span>)
        }
      </div>

      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div className="mark-as-read" onClick={() => markAllNotificationAsRead(unreadNotifications)}>
              Mark all as read
            </div>
          </div>
          {modifiedNotifications?.length === 0
            ? (
              <span className="notification">No notification</span>
            )
            :
            (modifiedNotifications.map((n, index) => {
              return (
                <div key={index} className={n.isRead ? "notification" : "notification not-read"} onClick={() => {
                  getChatWithNotification(n, userChats, user, unreadNotifications)
                  setIsOpen(false)
                }}
                >
                  <span>{`${n.senderName} sent you a new message`}</span>
                  <span className="notification-time">{moment(n.date).calendar()}</span>
                </div>
              )
            })
            )
          }
        </div>
      )
        : null
      }
    </div>
  )
}

export default Notification
