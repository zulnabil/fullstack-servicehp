import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  dateContainer: {
    maxWidth: 500,
    display: 'flex',
    justifyContent: 'space-between'
  },
  dateChild: {
    textAlign: 'center',
    width: '45%',
    margin: '0 0 20px'
  },
});

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.dateContainer}>
        <KeyboardDatePicker
          className={classes.dateChild}
          margin="normal"
          id="mui-pickers-date"
          label="Date"
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          className={classes.dateChild}
          margin="normal"
          id="mui-pickers-time"
          label="Time"
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
