import { configureStore } from '@reduxjs/toolkit'
import reducer from '../features/notification/notificationSlice'
import blogsReducer from '../features/blog/blogsSlice'
import userReducer from '../features/users/userSlice'
import usersReducer from '../features/users/usersSlice'
const store = configureStore({
  reducer: {
    notification: reducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
