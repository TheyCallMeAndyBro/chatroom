const unreadNotification = (notification) => {

  return notification.filter(notifications => notifications?.isRead === false && notifications?.senderId?.length > 0)
}

export {
  unreadNotification
}