import login from '../services/login'
import { useField } from '../../../hooks/index'
import { TextField, Box, Button, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import ToggLable from '../../../components/ui/ToggLable'
import { useLoginDispatch } from '../hooks/useLogin'
import { useNotificationDispatch } from '../../notification/hooks/useNotification'
const LoginForm = ({ setColor }) => {
  const username = useField('username')
  const password = useField('password')
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useLoginDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login({
        username: username.input.value,
        password: password.input.value,
      })
      userDispatch({ type: 'SET', payload: data })
      username.reset()
      password.reset()
      notificationDispatch({ type: 'SET', payload: {message:`${data.name} logged In`,display:'flex',severity:'success'} })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    } catch (error) {
      notificationDispatch({
        type: 'SET',
        payload: 'invalid username or password',
      })

      setColor(false)
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
        setColor(true)
      }, 2000)
    }
  }
  return (
    <ToggLable buttonLable="login">
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Login</Typography>
        <Box
          sx={{
            my: 2,
          }}
        >
          <TextField
            id="username"
            label="username"
            variant="outlined"
            {...username.input}
          />
        </Box>
        <Box
          sx={{
            my: 2,
          }}
        >
          <TextField
            id="password"
            label="password"
            variant="outlined"
            {...password.input}
          />
        </Box>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </ToggLable>
  )
}
LoginForm.propTypes = {
  setColor: PropTypes.func.isRequired,
}

export default LoginForm
