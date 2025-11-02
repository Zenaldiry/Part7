import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((s) => {
        return s.id !== action.payload
      })
    },
    likeBlog(state, action) {
      const blogToLike = state.find((s) => {
        return s.id === action.payload
      })
      blogToLike.likes += 1
    },
    commentBlog(state, action) {
      return state.map((s) => {
        return s.id === action.payload.id ? action.payload : s
      })
    },
  },
})

export default blogsSlice.reducer
export const { setBlogs, appendBlog, deleteBlog, likeBlog, commentBlog } =
  blogsSlice.actions

export const getBlogsfromServer = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const postBlogsToServer = (content, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content, token)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlogFromServer = (id, token) => {
  return async (dispatch) => {
    await blogService.deleteOne(id, token)
    dispatch(deleteBlog(id))
  }
}

export const likeBlogOnServer = (id, data, token) => {
  return async (dispatch) => {
    await blogService.update(id, data, token)
    dispatch(likeBlog(id))
  }
}

export const addCommentToServer = (id, data) => {
  return async (dispatch) => {
    const newBlog = await blogService.createComment(id, data)
    dispatch(commentBlog(newBlog))
  }
}
