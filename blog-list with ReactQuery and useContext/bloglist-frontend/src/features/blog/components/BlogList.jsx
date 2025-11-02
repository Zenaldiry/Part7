import { Box ,List,ListItem,ListItemText,ListItemButton, Typography} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
const BlogList = ({ user }) => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  if (!blogs) {
    return null
  }
  return (
    <Box id="blogs">
      <h1>Blogs</h1>
      <List>
        {blogs
          .sort((a, b) => {
            return b.likes - a.likes
          })
          .map((blog) => (
            <ListItem key={blog.id}>
              <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                <ListItemText primary={blog.title} />
                </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  )
}

export default BlogList
