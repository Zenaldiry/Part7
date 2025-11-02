import { useField } from '../../../hooks/index'
import { useNavigate } from 'react-router-dom'
import { useLoginValue } from '../../authentication/hooks/useLogin'
import { useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import blogServices  from '../../blog/services/blogs'
import { Button,TextField,Box } from '@mui/material'
import { useNotificationDispatch } from '../../notification/hooks/useNotification'
const BlogForm = () => {
  const navigate = useNavigate()
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const user = useLoginValue()
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  const createBlogMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, newBlog])
      notificationDispatch({ type: 'SET', payload: {message:`${newBlog.title} by ${newBlog.author} added `,display:'flex',severity:'success'} })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
      navigate('/blogs')
    },
  })
  const handleCreate = (e) => {
    e.preventDefault()
    const blogToCreate = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    }
    const data = {
      token: user.token,
      content: blogToCreate,
    }
    createBlogMutation.mutate(data )
    title.reset()
    author.reset()
    url.reset()
    
  }
  return (
<>
<h1>Create Blog</h1>
<form onSubmit={handleCreate}>
      <Box sx={{margin:'5px'}}>
      <TextField
            id="title"
            label="title"
            variant="outlined"
            {...title.input}
          />
      </Box>
      <Box sx={{margin:'5px'}}>
      <TextField
            id="author"
            label="author"
            variant="outlined"
            {...author.input}
          />
      </Box>
      <Box sx={{margin:'5px'}}>
      <TextField
            id="url"
            label="url"
            variant="outlined"
            {...url.input}
          />
      </Box>
      <Button variant="contained" type="submit">
      create
        </Button>
    </form></>
  )
}

export default BlogForm
