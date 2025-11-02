import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Table,TableCell,TableBody,TableRow,TableHead,TableContainer } from '@mui/material'
const Users = () => {
 const queryClient = useQueryClient()
    const users = queryClient.getQueryData(['users'])
    console.log(users)
    if (!users) {
        return null
    }
    return (
        <div>
            <h1>Users</h1>
            <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Blogs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell><Link style={{textDecoration:'none'}} to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                            <TableCell>{user.blogs.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default Users