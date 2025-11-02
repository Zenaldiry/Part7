import { useSelector } from 'react-redux'
import { Container, ListGroup } from 'react-bootstrap'
const User = ({ id }) => {
  const users = useSelector(({ users }) => {
    return users
  })
  const user = users.find((user) => {
    return user.id === id
  })
  if (!user) {
    return null
  }
  return (
    <div>
      <Container>
        <h1>{user.name}</h1>
        <ListGroup>
          <ListGroup.Item active>Added Blogs</ListGroup.Item>
          {user.blogs.map((blog) => {
            return (
              <ListGroup.Item key={blog.title}>{blog.title}</ListGroup.Item>
            )
          })}
        </ListGroup>
      </Container>
    </div>
  )
}

export default User
