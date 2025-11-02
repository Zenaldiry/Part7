import login from '../services/login'
import { useField } from '../hook'
import ToggLable from './ToggLable'
import { setUser } from '../features/users/userSlice'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setGreenNotification,
  clearNotification,
  setRedNotification,
} from '../features/notification/notificationSlice'
/////////////////***********************************************************************************************/////////////////// */
const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const username = useField('username')
  const password = useField('password')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login({
        username: username.input.value,
        password: password.input.value,
      })

      dispatch(setGreenNotification(`${data.name} logged In`))
      navigate('/')
      setTimeout(() => {
        dispatch(clearNotification())
      }, 2000)

      dispatch(setUser(data))

      username.reset()
      password.reset()
    } catch (error) {
      dispatch(setRedNotification('invalid username or password'))

      setTimeout(() => {
        dispatch(clearNotification())
      }, 2000)
    }
  }

  return (
    <ToggLable buttonLable="login">
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group>
          <Form.Label htmlFor="username">username</Form.Label>
          <Form.Control {...username.input} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">password</Form.Label>
          <Form.Control {...password.input} />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </ToggLable>
  )
}

export default LoginForm
