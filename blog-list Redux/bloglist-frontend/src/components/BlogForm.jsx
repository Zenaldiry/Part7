import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import {
  setGreenNotification,
  clearNotification,
} from '../features/notification/notificationSlice'
import { useField } from '../hook'
////////////////////////////////////////////////*************************************////////////////////////////////////////////////////////////////
const BlogForm = ({ createNote }) => {
  const disptach = useDispatch()
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const handleCreate = async (e) => {
    e.preventDefault()

    const blogToCreate = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    }

    await createNote(blogToCreate)

    disptach(
      setGreenNotification(
        `a new blog ${blogToCreate.title} by ${blogToCreate.author} added `
      )
    )

    setTimeout(() => {
      disptach(clearNotification())
    }, 3000)

    title.reset()
    author.reset()
    url.reset()
  }
  return (
    <Form onSubmit={handleCreate}>
      <Form.Group>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control {...title.input} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="author">Author</Form.Label>
        <Form.Control {...author.input} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="url">Url</Form.Label>
        <Form.Control {...url.input} />
      </Form.Group>
      <Button type="submit">create</Button>
    </Form>
  )
}
BlogForm.propTypes = {
  createNote: PropTypes.func.isRequired,
}
export default BlogForm
