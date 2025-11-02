import { createContext, useReducer } from 'react'
const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
  }
}

export const LoginContext = createContext()
export const LoginContextProvider = (props) => {
  const [value, loginDispatch] = useReducer(loginReducer, null)
  return (
    <LoginContext.Provider value={[value, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}
