import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
const ToggLable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const shownWhenVisible = { display: visible ? '' : 'none' }
  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisible = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisible,
    }
  })
  return (
    <div>
      <Button style={hiddenWhenVisible} onClick={toggleVisible}>
        {props.buttonLable}
      </Button>
      <div style={shownWhenVisible}>
        {props.children}
        <Button variant="secondary" onClick={toggleVisible}>
          cancel
        </Button>
      </div>
    </div>
  )
})
ToggLable.propTypes = {
  buttonLable: PropTypes.string.isRequired,
}
ToggLable.displayName = 'ToggLable'

export default ToggLable
