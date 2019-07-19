import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CircularProgress from '@material-ui/core/CircularProgress'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';

import { Redirect } from 'react-router-dom'

import NumberFormat from 'react-number-format';

import IntegrationReactSelect from '../AutoSuggest'
import MaterialUIPickers from '../add_item/subcomponents/DatePicker'
import RadioStatus from './subcomponents/RadioStatus'

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
    padding: 20
  },
  containerProblem: {
    maxWidth: 500,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  textField: {
    textAlign: 'left',
    width: '100%',
  },
  textProblem: {
    textAlign: 'center',
    width: '30%',
    margin: '0 0 20px'
  },
  radioStatus: {
    textAlign: 'center',
    width: '20%',
    margin: '0 0 20px'
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
  buttonBlue: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #0d8bf2 30%, #0dc8f2 90%)',
    },
  },
  buttonRed: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    transition: 'background linear .25',
    '&:hover': {
      background: 'linear-gradient(45deg, #fe4d74 30%, #ff7a33 90%)',
      transition: 'background linear .25'
    },
  },
  snackbarContainer: {
    marginBottom: 55,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0
    }
  }
}));

const brands = [
  { label: 'iPhone' },
  { label: 'Samsung' },
  { label: 'Xiaomi' },
  { label: 'Oppo' },
  { label: 'Vivo' },
  { label: 'Asus' },
  { label: 'Realme' },
  { label: 'Huawei' },
  { label: 'Nokia' },
  { label: 'Advan' },
  { label: 'Coolpad' },
  { label: 'Blackberry' },
  { label: 'Mito' },
  { label: 'HTC' },
  { label: 'Sony' },
].map(brand => ({
  value: brand.label,
  label: brand.label,
}))

const color = [
  'Black', 'White', 'Red', 'Blue', 'Grey', 'Gold', 'Rose Gold'
];

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
    />
  );
}

function PhoneNumberFormat(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      format="#### #### ####"
    />
  );
}

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
    progress: {
      marginTop: 100,
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

function EditItem(props) {
  const classes = useStyles();

  useEffect(() => {
    axios.get('https://us-central1-uniq-servishp.cloudfunctions.net/app/api/'+props.match.params.id)
      .then(res => {
        const oneLoad = res.data
        // console.log(props.match.params.id)
        setValues(oneLoad.data)
        // console.log(props.id)
        console.log(oneLoad.data)
      })
  }, [props.match.params.id])

  const [values, setValues] = useState({
    brand_hp: '',
    type_hp: '',
    color_hp: '',
    phone_number_owner: '',
    name_owner: '',
    problems: [
      {
        name: '',
        fee: 0,
        sparepart_fee: 0
      }
    ],
    down_payment: 0,
    update_date: new Date(),
    due_date: new Date(),
    checkin_signature: '',
    checkout_date: null
  });
  
  const validateForm = () => {
    const { brand_hp, type_hp, color_hp, phone_number_owner, name_owner } = values
    if (brand_hp && type_hp && color_hp && phone_number_owner && name_owner) {
      return true
    }
    return false
  }

  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    variant: '',
    message: ''
  })

  const [duration, setDuration] = React.useState(3000)

  const handleDateChange = date => {
    setValues({ ...values, 'due_date': date })
  }

  const handleChange = input => event => {
    setValues({ ...values, [input]: event.target.value });
  };

  const problemsChange = (prop, index) => event => {
    const newProblems = values.problems.slice()
    if (prop !== 'name') {
      newProblems[index][prop] = ~~event.target.value
    } else {
      newProblems[index][prop] = event.target.value
    }
    setValues({ ...values, 'problems': newProblems });
  }

  const brandChange = (brand) => {
    setValues({ ...values, 'brand_hp': brand.value })
  }

  function addProblem() {
    setValues({ ...values, 'problems': values.problems.concat({
      name: '',
      fee: 0,
      sparepart_fee: 0
    }) })
  }

  function removeProblem() {
    if (values.problems.length <= 1) {
      setSnackbar({
        variant: 'warning',
        message: 'At least one problem is needed'
      })
      setOpen(true)
    } else {
      let poop = [...values.problems]
      poop.pop()
      setValues({ ...values, 'problems': poop })
    }
  }

  const [redirect, setRedirect] = React.useState(false)

  if (redirect) {
    return <Redirect to='/' />
  }

  function handleSubmit() {
    values.checkout_date = ''
    values.update_date = new Date()
    if (values.status === 'checked_out') {
      setValues({ ...values, 'checkout_date': new Date() })
    }
    console.log(values)
    if (validateForm()) {
      setSnackbar({
        variant: 'info',
        message: 'Sending informations...'
      })
      setDuration(10000)
      axios.put('https://us-central1-uniq-servishp.cloudfunctions.net/app/api/edit/'+props.match.params.id, values)
        .then(res => {
          console.log(res.data)
          setSnackbar({
            variant: 'success',
            message: 'Successfully submitted.'
          })
          setDuration(3000)
          setOpen(true)
          setTimeout(() => setRedirect(true), 2000)
        })
    } else {
      setSnackbar({
        variant: 'error',
        message: 'Fill all form before submit!'
      })
      setDuration(3000)
    }
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return values.name_owner ? (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <Typography className={classes.title} >Edit Data</Typography>
        <TextField
          id="standard-name"
          label="Name Owner"
          value={values.name_owner}
          className={classes.textField}
          onChange={handleChange('name_owner')}
          margin="normal"
        />
        <TextField
          id="standard-number"
          label="Phone Number"
          value={values.phone_number_owner}
          onChange={handleChange('phone_number_owner')}
          className={classes.textField}
          margin="normal"
          InputProps={{
            inputComponent: PhoneNumberFormat,
          }}
        />
        <div style={{ margin: '20px auto 0' }} className={classes.textField}>
          <IntegrationReactSelect
            label='Brand Handphone'
            suggestions={brands}
            brandSelect={brandChange}
            defaultInputValue={values.brand_hp}
            className={classes.textField}
          />
        </div>
        <TextField
          id="standard-typehp"
          label="Type Handphone"
          value={values.type_hp}
          onChange={handleChange('type_hp')}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-select-colorhp"
          select
          label="Select Color"
          className={classes.textField}
          value={values.color_hp}
          onChange={handleChange('color_hp')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your color handphone"
          margin="normal"
        >
          {color.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Typography align='left' style={{ marginTop: 20 }}>Problems :</Typography>
        {values.problems.map((problem, key) => {
          return (
            <div className={classes.containerProblem} key={key+1}>
              <TextField
                id={"standard-problem-"+(key+1)}
                label={"Problem "+(key+1)}
                value={problem.name}
                className={classes.textProblem}
                margin="normal"
                onChange={problemsChange('name',key)}
              />
              <TextField
                id={"standard-fee-"+(key+1)}
                label={"Fee "+(key+1)}
                value={problem.fee}
                className={classes.textProblem}
                margin="normal"
                placeholder='0'
                onChange={problemsChange('fee',key)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                id={"standard-sparepartfee-"+(key+1)}
                label={"Sparepart "+(key+1)}
                value={problem.sparepart_fee}
                className={classes.textProblem}
                margin="normal"
                placeholder='0'
                onChange={problemsChange('sparepart_fee',key)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                  inputComponent: NumberFormatCustom,
                }}
              />
            </div>
          )
        })}
        <Fab onClick={removeProblem} style={{ float: 'right', margin: 5 }} size="small" color="secondary" aria-label="Remove" className={classes.buttonRed}>
            <RemoveIcon />
        </Fab>
        <Fab onClick={addProblem} style={{ float: 'right', margin: 5 }} size="small" color="primary" aria-label="Add" className={classes.buttonBlue}>
            <AddIcon />
        </Fab>
        <TextField
          id="standard-downpayment"
          label="Down Payment"
          value={values.down_payment}
          className={classes.textField}
          margin="normal"
          placeholder='0'
          onChange={handleChange('down_payment')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
            inputComponent: NumberFormatCustom,
          }}
        />
        <Typography align='left' style={{ marginTop: 30 }}>Due Date :</Typography>
        <MaterialUIPickers selectedDate={values.due_date} handleDateChange={handleDateChange} />
        <Typography align='left' style={{ marginTop: 20 }}>Status :</Typography>
        <RadioStatus 
          classParent={classes.containerProblem} 
          classChild={classes.radioStatus} 
          value={values.status} 
          handleChange={handleChange('status')}
        />
        <Button onClick={handleSubmit} style={{ width: '100%', marginTop: 35, marginBottom: 5 }} variant="contained" size="medium" aria-label="Submit">
            <SaveIcon style={{ marginRight: 10 }} />
            Submit
        </Button>
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
    </div>
  ) : (
    <CircularProgress className={classes.progress} color="primary" />
  )
}

export default EditItem;