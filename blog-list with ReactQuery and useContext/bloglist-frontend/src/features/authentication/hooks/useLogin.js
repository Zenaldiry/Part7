import { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContextProvider'
export const useLoginValue = () => {
  const valueAndDispatch = useContext(LoginContext)
  return valueAndDispatch[0]
}
export const useLoginDispatch = () => {
  const valueAndDispatch = useContext(LoginContext)
  return valueAndDispatch[1]
}
