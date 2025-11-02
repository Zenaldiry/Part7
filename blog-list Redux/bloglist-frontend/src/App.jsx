import { useEffect, useRef } from 'react'
import { Navbar, Nav, Button, Container, Alert } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import ToggLable from './components/ToggLable'
import { useDispatch, useSelector } from 'react-redux'
import BlogsList from './components/BlogsList'
import BlogPost from './components/BlogPost'
import { Route, Routes, Link, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { useNavigate } from 'react-router-dom'
import {
  getBlogsfromServer,
  postBlogsToServer,
} from './features/blog/blogsSlice'
import { setUser, clearUser } from './features/users/userSlice'
//////////////////////////**************************************************** */

const App = () => {
  const navigate = useNavigate()
  const notification = useSelector(({ notification }) => {
    return notification
  })
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  const userId = userMatch ? userMatch.params.id : null
  const blogId = blogMatch ? blogMatch.params.id : null
  const disptach = useDispatch()
  useEffect(() => {
    disptach(getBlogsfromServer())
  }, [])
  const user = useSelector(({ user }) => {
    return user
  })
  const blogFormRef = useRef()
  const createNote = async (blogToCreate) => {
    disptach(postBlogsToServer(blogToCreate, user.token))
    blogFormRef.current.toggleVisible()
  }

  const handleLogout = () => {
    window.localStorage.clear()
    disptach(clearUser())
    navigate('/login')
  }
  useEffect(() => {
    const userFromLocal = window.localStorage.getItem('loggedBlogUser')
    disptach(setUser(JSON.parse(userFromLocal)))
  }, [])
  return (
    <div>
      <Container>
        {user === null ? (
          <LoginForm />
        ) : (
          <>
            <h2>BlogApp</h2>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Nav>
                  <Nav.Link href="/">Blogs</Nav.Link>
                  <Nav.Link href="/users">Users</Nav.Link>
                </Nav>
                <Navbar.Text id="loginHeading">
                  <strong>{user.name}</strong> Logged in
                  <Button onClick={handleLogout}>Logout</Button>
                </Navbar.Text>
              </Container>
            </Navbar>
            {notification.message && (
              <Alert variant={notification.type}>{notification.message}</Alert>
            )}

            <Routes>
              <Route path="/blogs/:id" element={<BlogPost id={blogId} />} />
              <Route path="/users/:id" element={<User id={userId} />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/"
                element={
                  <div id="blogs">
                    <div>
                      <h2>Create new</h2>
                      <ToggLable buttonLable="new note" ref={blogFormRef}>
                        <BlogForm createNote={createNote} />
                      </ToggLable>
                    </div>
                    <BlogsList />
                  </div>
                }
              />
              <Route path="/users" element={<Users />} />
            </Routes>
          </>
        )}
      </Container>
    </div>
  )
}

export default App
