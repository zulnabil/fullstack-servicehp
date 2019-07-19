import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'

function RadioStatus(props) {
  return (
    <RadioGroup
      aria-label="Gender"
      name="gender1"
      className={props.classParent}
      value={props.value}
      onChange={props.handleChange}
    >
      <FormControlLabel className={props.classChild} value="pending" control={<Radio style={{ color: '#ffa000' }} />} label="Pending" />
      <FormControlLabel className={props.classChild} value="success" control={<Radio style={{ color: '#4caf50' }} />} label="Success" />
      <FormControlLabel className={props.classChild} value="fail" control={<Radio style={{ color: '#b71c1c' }} />} label="Fail" />
      <FormControlLabel className={props.classChild} value="checked-out" control={<Radio style={{ color: '#4caf50' }} />} label="Checked-out" />

    </RadioGroup>
  )
}

export default RadioStatus