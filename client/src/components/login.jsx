import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { amber, green } from '@material-ui/core/colors';

import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

import { Redirect } from 'react-router-dom'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 500,
    margin: '100px auto 100px',
    padding: 20,
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    textAlign: 'left',
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
    color: '#616161'
  },
  buttonLogin: {
    backgroundColor: '#4caf50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#388e3c'
    },
    width: '100%',
    borderRadius: 5,
    marginTop: 20
  }
}));

function MySnackbarContentWrapper(props) {
  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}


export default function LoginForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });

  const [open, setOpen] = React.useState(false);

  const [snackbar, setSnackbar] = React.useState({
    variant: '',
    message: ''
  })

  const [duration, setDuration] = React.useState(3000)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const validateForm = () => {
    const { email, password } = values
    if ((email) && (password)) {
      return true
    }
    return false
  }

  const [redirect, setRedirect] = React.useState(false)

  if (redirect) {
    return <Redirect to='/' />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(values)
    if (validateForm()) {
      setSnackbar({
        variant: 'info',
        message: 'Sending login data...'
      })
      setDuration(10000)
      setOpen(true)
      axios.post('https://us-central1-uniq-servishp.cloudfunctions.net/app/api/login', values)
      .then(res => {
        if (res.data.error) {
          setSnackbar({ 
            variant: 'error',
            message: 'Incorrect email or password'
          })
          setDuration(3000)
          setOpen(true)
        } else {
          setSnackbar({
            variant: 'success',
            message: 'You have logged-in'
          })
          // set to local storage
          localStorage.setItem('dr_gadget_token', res.data.token)

          setDuration(3000)
          setOpen(true)
          setTimeout(() => setRedirect(true), 2000)
        }
      })
    } else {
      setSnackbar({
        variant: 'error',
        message: 'Fill all form before submit!'
      })
      setDuration(3000)
      setOpen(true)
    }
    
  }

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="on">
        <Typography className={classes.title} >Login Form</Typography>
        <TextField
          id="standard-email"
          label="Email"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('email')}
          margin="normal"
        />
        <TextField
          id="standard-password"
          label="Password"
          className={classes.textField}
          type="password"
          value={values.name}
          autoComplete="current-password"
          onChange={handleChange('password')}
          margin="normal"
        />
        <Button onClick={handleSubmit} className={classes.buttonLogin}>Log-in</Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        className={classes.snackbarContainer}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={snackbar.variant}
          message={snackbar.message}
        />
    
      </Snackbar>
    </React.Fragment>
  );
}
