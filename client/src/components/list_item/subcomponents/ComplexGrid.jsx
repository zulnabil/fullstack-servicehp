import React from 'react';
// import Moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import { AppleIcon, SamsungIcon, XiaomiIcon, AsusIcon, OppoIcon, VivoIcon, NokiaIcon, SonyIcon, HuaweiIcon, AdvanIcon } from './BrandIcon'

const moment = require('moment');

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto 10px',
    maxWidth: 500,
    position: 'relative',
    // boxShadow: 'none',
    borderRadius: 10,
    // borderBottom: '1px solid #c8d6e5'
  },
  typoright: {
    fontSize: 14,
    textAlign: 'right',
    color: '#424242'
  },
  statusBadge: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingRight: 15,
    paddingBottom: 10
  },
  chipStatus: {
    color: 'white',
    marginBottom: 10
  },
  image: {
    width: 32,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  typo: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#424242'
  },
  typoBrand: {
    fontWeight: 600,
    marginBottom: 15,
    color: '#424242'
  }
}));

function toRupiah(value) {
  return 'Rp'+value/1000+'rb'
} 

function ComplexGrid(props) {

  const { item } = props

  function SelectBrandIcon() {
    switch (item.brand_hp) {
      case 'iPhone':
        return AppleIcon()
      case 'Samsung':
        return SamsungIcon()
      case 'Xiaomi':
        return XiaomiIcon()
      case 'Asus':
        return AsusIcon()
      case 'Oppo':
        return OppoIcon()
      case 'Vivo':
        return VivoIcon()
      case 'Nokia':
        return NokiaIcon()
      case 'Sony':
        return SonyIcon()
      case 'Huawei':
        return HuaweiIcon()
      case 'Advan':
        return AdvanIcon()
      default:
        break;
    }
  }

  function ColorStatus() {
    switch (item.status) {
      case 'pending':
        return 'linear-gradient(45deg, #ffa000 30%, #ffd54f 90%)'
      case 'fail':
        return 'linear-gradient(45deg, #b71c1c 30%, #e57373 90%)'
      case 'success':
        return 'linear-gradient(45deg, #4caf50 30%, #a5d6a7 90%)'
      case 'checked-out':
        return 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
      default:
        break;
    }
  }
  const classes = useStyles();

  const remainingDateTime = (value) => {
    const nowDate = moment(new Date())
    const dueDate = moment(value)
    const dueDay = dueDate.diff(nowDate, 'days')
    const dueHour = dueDate.diff(nowDate, 'hours')
    let stringDay = ''
    let stringHour = ''
    if (dueDay <= 1) {
      stringDay = `${dueDay} day`
    } else if (dueDay > 1) {
      stringDay = `${dueDay} days`
    }
    if (dueHour <= 1) {
      stringHour = `${dueHour - (dueDay*24)} hour`
    } else if (dueHour > 1) {
      stringHour= `${dueHour - (dueDay*24)} hours`
    }
    return `${stringDay} and ${stringHour}`
  }

  function timestampToDate(value) {
    return moment(value).format('lll')
  }

  function remainingTime() {
    if (item.status === 'pending') {
      return (
        <Typography className={classes.typo} variant="body2" gutterBottom>
          Remaining time : {remainingDateTime(item.due_date)}
        </Typography>
      )
    }
  }

  return (
    <div className={classes.root}>
      <Paper style={{ cursor: 'pointer' }} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="brand" src={SelectBrandIcon()} />
              </ButtonBase>
            </Grid>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                <Typography className={classes.typoBrand} variant="body2" gutterBottom>
                  {item.brand_hp} {item.type_hp} ({item.color_hp})
                </Typography>
                <Typography className={classes.typo} variant="body2" gutterBottom>
                  {(item.problems.length === 1) ? 'Problem' : 'Problems'} : {item.problems.map((problem, key) => {
                    return (
                      <span key={key}>
                        {problem.name}{((key+1)) === item.problems.length ? '' : ', '}
                      </span>
                    )
                  })}
                </Typography>
                </Typography>
                {remainingTime()}
                <Typography variant="body2" color="textSecondary">
                  {item.name_owner} - {item.phone_number_owner}
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Grid item>
                <Typography className={classes.typoright} variant="subtitle1">
                  {toRupiah(item.must_pay)},- <br />
                  (DP - {toRupiah(item.down_payment)})
                  <br />
                  <br />
                  <br />
                </Typography>
              </Grid>
              <Grid item>
                <div className={classes.statusBadge}>
                  <Chip label={item.status.toUpperCase()} style={{background: ColorStatus()}} className={classes.chipStatus} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ComplexGrid;
