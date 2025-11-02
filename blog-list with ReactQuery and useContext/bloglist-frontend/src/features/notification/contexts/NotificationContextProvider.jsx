import { createContext, useReducer } from 'react'
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      //  console.log(action.payload)
      return {message:action.payload.message,severity:action.payload.severity,display:action.payload.display}
    case 'CLEAR':
      return {display:"none"}
  }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [value, notificationDispatch] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={[value, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
