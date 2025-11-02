import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  setRedNotification,
  clearNotification,
} from '../features/notification/notificationSlice'
import {
  Button,
  Toast,
  ToastContainer,
  Form,
  InputGroup,
} from 'react-bootstrap'
import { useField } from '../hook'
import {
  deleteBlogFromServer,
  likeBlogOnServer,
  addCommentToServer,
} from '../features/blog/blogsSlice'
const BlogPost = ({ id }) => {
  const navigate = useNavigate()
  const comment = useField('comment')
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => {
    return user
  })
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const blog = blogs.find((blog) => {
    return blog.id === id
  })

  if (!blog) {
    return null
  }

  const handleDelete = async ({ target }) => {
    const id = target.id
    const blogToDelete = blogs.find((blog) => {
      return blog.id === id
    })
    const confirmDialog = confirm(
      `Remove ${blogToDelete.title}  by ${blogToDelete.author}`
    )
    if (confirmDialog) {
      dispatch(deleteBlogFromServer(id, user.token))
      navigate('/')
      dispatch(
        setRedNotification(
          `${blogToDelete.title}  by ${blogToDelete.author} removed successfully`
        )
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }
  const handleLikes = async ({ target }) => {
    const id = target.id
    const likesOfBlog = blogs.find((blog) => {
      return blog.id === id
    }).likes
    const newLikes = {
      likes: likesOfBlog + 1,
    }
    dispatch(likeBlogOnServer(id, newLikes, user.token))
  }
  const handleComment = (e) => {
    e.preventDefault()
    if (comment.input.value !== '') {
      dispatch(addCommentToServer(id, { comment: comment.input.value }))
      comment.reset()
    }
  }
  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <span>Url: </span>
      <Link id="url">{blog.url}</Link>
      <div>
        <span id="likes" className="me-2">
          {blog.likes} likes
        </span>
        <Button id={blog.id} variant="success" size="sm" onClick={handleLikes}>
          Like
        </Button>
      </div>
      <div id="userName">
        created by: <strong>{blog.user.name}</strong>
      </div>
      {user.username === blog.user.username && (
        <Button variant="danger" onClick={handleDelete} id={blog.id}>
          remove
        </Button>
      )}
      <h3>Comments</h3>
      <Form onSubmit={handleComment}>
        <InputGroup className="mb-3">
          <Form.Control placeholder="Add your comment..." {...comment.input} />
          <Button variant="outline-secondary" type="submit">
            Add Comment
          </Button>
        </InputGroup>
      </Form>
      <ToastContainer>
        {blog.comments.map((comment, index) => {
          return (
            <Toast key={index}>
              <Toast.Header closeButton={false}>
                <strong>Anonymous</strong>
              </Toast.Header>
              <Toast.Body>
                <li>{comment}</li>
              </Toast.Body>
            </Toast>
          )
        })}
      </ToastContainer>
    </div>
  )
}

export default BlogPost
