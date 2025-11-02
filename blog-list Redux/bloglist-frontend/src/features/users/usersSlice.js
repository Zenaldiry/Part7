import { createSlice } from '@reduxjs/toolkit'
import userService from '../../services/users'
const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export default usersSlice.reducer
export const { setUsers } = usersSlice.actions
export const getUsersFromServer = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch(setUsers(users))
  }
}
