import { useParams } from 'react-router-dom'  
import {useQueryClient} from '@tanstack/react-query'  
import { Container, List,ListItem } from '@mui/material'
const User = () => {
    const { id } = useParams()
    const queryClient = useQueryClient()
    const users = queryClient.getQueryData(['users'])
    const user = users.find(user => user.id === id)
    if (!user) {
        return null
    }
    return (
        <Container>
            <h1>User</h1>
            <h2>{user.name}</h2>
            <h3>Added Blogs</h3>
            <List>
                {user.blogs.map(blog => (
                    <ListItem key={blog.id}>{blog.title}</ListItem>
                ))}
            </List>
        </Container>
    )
}

export default User;