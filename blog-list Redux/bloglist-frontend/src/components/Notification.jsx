import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
const Notification = () => {
  const style = useSelector((state) => {
    return state.notification.style
  })
  const notification = useSelector((state) => state.notification.message)
  return <div style={style}>{notification}</div>
}

export default Notification
