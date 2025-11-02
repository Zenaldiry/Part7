import { useState } from 'react'
import { Button } from '@mui/material'
const ToggBtn = (props) => {
  const [visible, setVisible] = useState(false)
  const btnName = visible ? props.hide : props.show
  const shownWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisible = () => {
    setVisible(!visible)
  }
  return (
    <span>
      <Button onClick={toggleVisible}>{btnName}</Button>
      <div style={shownWhenVisible}>{props.children}</div>
    </span>
  )
}

export default ToggBtn
