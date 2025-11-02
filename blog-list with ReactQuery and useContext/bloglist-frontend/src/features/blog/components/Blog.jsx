import { Box,Button,Container,Link,List,ListItem,TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useLoginValue } from '../../authentication/hooks/useLogin'
import { useMutation } from '@tanstack/react-query'
import blogServices from '../../blog/services/blogs'
import { useNavigate } from 'react-router-dom'
import { useField } from '../../../hooks'
import { useNotificationDispatch } from '../../notification/hooks/useNotification'
const Blog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const user = useLoginValue()
  const blog = queryClient
    .getQueryData(['blogs'])
    .find((blog) => blog.id === id)
  const notificationDispatch = useNotificationDispatch()
  const comment = useField('comment')
  const likeBlogMutation = useMutation({
    mutationFn: blogServices.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => {
          return blog.id === updatedBlog.id ? updatedBlog : blog
        })
      )
    },
  })
  const deletBlogMutation = useMutation({
    mutationFn: blogServices.deleteOne,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== id)
      )
      notificationDispatch({ type: 'SET', payload: {message:`${blog.title} by ${blog.author} deleted `,display:'flex',severity:'error'} })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
      navigate('/blogs')
    },
  })
  const updateCommentsMutation = useMutation({
    mutationFn: blogServices.updateComments,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    },
  })

  const handleLikes = async () => {
    const likesOfBlog = blog.likes
    const newLikes = {
      likes: likesOfBlog + 1,
    }
    const data = {
      token: user.token,
      id: id,
      content: newLikes,
    }

    likeBlogMutation.mutate(data)
  }
  const handleDelete = async () => {
    const data = {
      token: user.token,
      id: id,
    }
    const blogToDelete = blog
    const confirmDialog = confirm(
      `Remove ${blogToDelete.title}  by ${blogToDelete.author}`
    )
    if (confirmDialog) {
      deletBlogMutation.mutate(data)
    }
  }

  const handleAddComment = async () => {
    const data = {
      id: id,
      content: comment.input.value,
    }
    updateCommentsMutation.mutate(data)
    comment.reset()
  }
  if (!blog) {
    return null
  }

  const removeBtnStyle = {
    backgroundColor: 'red',
  }
  return (
    <Container>
      <Box id="blog">
      <h1 id="title-author">
        {blog.title} by {blog.author}{' '}
      </h1>
      <Box data-testid="blogDetails" sx={{display:'flex' , flexDirection:'column', gap:'5px'}}>
        <Link id="url">{blog.url}</Link>
        <Box sx={{backgroundColor:'#eee', padding:'5px' , width:"120px"}}>
          <span  id="likes">{blog.likes}</span>
          <Button variant='outlined' id={blog.id} onClick={handleLikes}>
            like
          </Button>
        </Box>
        <Box id="userName">Added by: {blog.user.username}</Box>
        {user.username === blog.user.username && (
          <Button onClick={handleDelete} id={blog.id} variant='outlined' color='error'>
            remove
          </Button>
        )}
        <div id="comments">
          <h3>Add comment</h3>
          <TextField {...comment.input} />
          <Button onClick={handleAddComment} id="addComment">
            Add Comment
          </Button>
        </div>
          <h3>Comments</h3>
        <div id="commentsList">
          <List>
            {blog.comments.map((comment, i) => (
              <ListItem key={i}>{comment}</ListItem>
            ))}
          </List>
        </div>
      </Box>
    </Box>
    </Container>
  )
}

export default Blog
