import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  type: 'success',
  message: '',
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setGreenNotification(state, action) {
      return {
        type: 'success',
        message: action.payload,
      }
    },
    setRedNotification(state, action) {
      return {
        type: 'danger',
        message: action.payload,
      }
    },
    clearNotification() {
      return initialState
    },
  },
})

export default notificationSlice.reducer
export const { setGreenNotification, setRedNotification, clearNotification } =
  notificationSlice.actions
