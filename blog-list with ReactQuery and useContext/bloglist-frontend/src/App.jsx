import { useState, useEffect } from 'react'
import {
  useLoginValue,
  useLoginDispatch,
} from './features/authentication/hooks/useLogin'
import userService from './features/users/services/user'
import blogServices from './features/blog/services/blogs'
import BlogList from './features/blog/components/BlogList'
import LoginForm from './features/authentication/components/LoginForm'
import BlogForm from './features/blog/components/BlogForm'
import Notification from './features/notification/components/Notification'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Users from './features/users/components/Users'
import User from './features/users/components/User'
import Blog from './features/blog/components/Blog'
import DrawerAppBar from './components/ui/DrawerAppBar'
import Home from './components/ui/Home'
const App = () => {
  const user = useLoginValue()
  const userDispatch = useLoginDispatch()
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  })
  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogServices.getAll(),
  })

  const handleLogout = () => {
    window.localStorage.clear()
    userDispatch({ type: 'CLEAR' })
  }

  useEffect(() => {
    const userFromLocal = window.localStorage.getItem('loggedBlogUser')
    userDispatch({ type: 'SET', payload: JSON.parse(userFromLocal) })
  }, [])

  if (usersResult.isLoading || blogsResult.isLoading) {
    return <div>Loading...</div>
  }
  if (usersResult.isError || blogsResult.isError) {
    return <div>Error: something went wrong</div>
  }
  const users = usersResult.data
  return (
    <div>
      {user === null ? (
        <LoginForm/>
      ) : (
        <>
      <Notification />
        <DrawerAppBar user={user} handleLogout={handleLogout} />
        <div style={{marginTop:'80px'}}>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs" element={<BlogList user={user} />} />
        <Route path="/create" element={<BlogForm />} />
      </Routes>
        </div>
        </>
      )}
    </div>
  )
}

export default App
