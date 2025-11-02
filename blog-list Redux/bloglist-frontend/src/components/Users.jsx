import { getUsersFromServer } from '../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useEffect } from 'react'
const Users = () => {
  const disptach = useDispatch()

  useEffect(() => {
    disptach(getUsersFromServer())
  }, [])
  const users = useSelector(({ users }) => {
    return users
  })
  return (
    <div>
      <h2>Users</h2>
      <Table striped="columns" variant="dark" hover bordered>
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.name}>
                <td>
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
