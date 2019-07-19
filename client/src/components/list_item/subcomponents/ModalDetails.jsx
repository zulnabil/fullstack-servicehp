import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import blue from '@material-ui/core/colors/blue';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/EditRounded';
import PrintIcon from '@material-ui/icons/Print';

import { AppleIcon, SamsungIcon, XiaomiIcon, AsusIcon, OppoIcon, VivoIcon, NokiaIcon, SonyIcon, HuaweiIcon, AdvanIcon } from './BrandIcon'
import { Typography } from '@material-ui/core';
import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')

const useStyles = makeStyles(theme => ({
    progressWrapper: {
        textAlign: 'center',
        margin: '20px 0'
    },
    progress: {
      textAlign: 'center',
      display: 'inline-block',
    },
    modal: {
      width: '90%',
      maxWidth: 500,
      margin: '150px auto',
      outline: 'none',
      borderRadius: '5px'
    },
    headModal: {
      color: blue[900],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: blue[50],
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: theme.spacing(2)
    },
    profileModal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyModal: {
      color: '#424242',
      backgroundColor: 'white',
      padding: theme.spacing(2),
      overflow: 'hidden',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      '& p': {
        margin: 0,
        fontSize: '12px'
      }
    },
    textField: {
      width: 100,
      margin: 0,
      fontSize: '12px'
    },
    chipDate: {
      '& span': {
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: 600
      }
    },
    ChipDueDate: {
      margin: 5,
    },
    ChipExpiredDate: {
      margin: 5,
    },
    chipStatus: {
      color: 'white',
      marginBottom: 10
    },
    chipCheckedout: {
      textTransform: 'uppercase',
      fontWeight: 600,
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
    },
    fabEdit: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    shapeCircle: {
      height: 50,
      width: 50,
      borderRadius: '50%',
      backgroundColor: 'white',
      display: 'flex'
    },
    redColor: {
      backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      '&:hover': {
        background: 'linear-gradient(45deg, #fe4d74 30%, #ff7a33 90%)',
      }
    },
    greenColor: {
      backgroundImage: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
      '&:hover': {
        background: 'linear-gradient(45deg, #43a047 30%, #7cb342 90%)',
      }
    }
  }));

const toCurrency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
})


function BodyModal(props) {
    const classes = useStyles();
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

    function timestampToDate(value) {
      return moment(value).format('llll')
    }

    function getExpiredDate(value) {
      const duedate = moment(value).add(14, 'days').format('llll')
      return duedate
    }

    const checkoutStatus = () => {
      if (item.status === 'checked-out') {
        return (
          <Typography className={classes.chipCheckedout}>Checked-out on {timestampToDate(new Date())}</Typography>
        )
      }
    }

    return (
        <div>
            {props.loading ? 
              <div><div className={classes.headModal}></div><div className={classes.bodyModal}><div className={classes.progressWrapper}><CircularProgress className={classes.progress} /></div></div></div> :
            <div>
              <div className={classes.headModal}>
                  <div className={classes.profileModal}> 
                    <div className={classes.shapeCircle}>
                        <img style={{ margin: 'auto' }} width="32px" src={SelectBrandIcon()} alt="brand"/>
                    </div>
                    <div style={{marginLeft: '12px'}}>
                      <h5 style={{ margin: 0 }}>{item.name_owner}</h5>
                      <p style={{ margin: '0', color: blue[800], fontSize: '10px' }}>
                        {item.phone_number_owner}
                      </p>
                    </div>
                  </div>
                  <div>
                  <Chip label={item.status.toUpperCase()} style={{background: ColorStatus()}} className={classes.chipStatus} />
                  </div>
              </div>
              <div className={classes.bodyModal}>
              <div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 5 }}>{item.brand_hp} {item.type_hp} ({item.color_hp})</p>
                </div>
                <div>
                  <div style={{ marginBottom: 5 }}>
                    <p>Problems :</p>
                    {item.problems.map((problem, key) => {
                      return (
                        <div key={key+1} style={{display: 'flex'}}>
                          <div style={{flex: 1}}>
                            <p>{problem.name}</p>
                          </div>
                          <div>
                            <p>{toCurrency.format(problem.fee)}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <Divider />
                  <div style={{ marginTop: 5, display: 'flex' }}>
                    <div style={{flex: 1}}>
                      <p>Total Fee</p>
                    </div>
                    <div>
                      <p>{toCurrency.format(item.total_fee)}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 5, display: 'flex' }}>
                    <div style={{flex: 1}}>
                      <p>Down Payment</p>
                    </div>
                    <div>
                      <p>- {toCurrency.format(item.down_payment)}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 5, fontWeight: 600, display: 'flex' }}>
                    <div style={{flex: 1}}>
                      <p>Must Pay</p>
                    </div>
                    <div>
                      <p>{toCurrency.format(item.must_pay)}</p>
                    </div>
                  </div>
                  <div>
                    <Grid 
                      container 
                      spacing={3}
                      direction="row"
                      justify="space-around"
                      alignItems="flex-end"
                      style={{marginTop: 10}}
                    >
                      <Grid item xs={10}>
                        <Typography className={classes.chipDate}>Check-in at<br/><span>{timestampToDate(item.create_date)}</span></Typography>
                        <Typography className={classes.chipDate}>Can check-out from : </Typography>
                        <Typography className={classes.chipDate} style={{ display: 'flex' }}>
                          <span>{timestampToDate(item.due_date)}</span>&nbsp;to&nbsp;<span>{getExpiredDate(item.due_date)}</span>
                        </Typography>
                        <br/>
                        {checkoutStatus()}
                      </Grid>
                      <Grid item xs={2} className={classes.fabEdit}>
                        <Link style={{ textDecoration: 'none', color: 'inherit', marginRight: 5 }} to={'/edit/'+props.id} >
                          <Fab size="small" color="secondary" className={classes.redColor} aria-label="Edit" >
                            <EditIcon />
                          </Fab>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/print/'+props.id} >
                          <Fab size="small" color="secondary" className={classes.greenColor} aria-label="Print" >
                            <PrintIcon />
                          </Fab>
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
            </div>
            }
        </div>
    )
}

function ModalDetails(props) {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
        >
            <Grow 
            in={props.open}
            style={{ transformOrigin: '50 0 50' }}
            {...(props.open ? { timeout: 500 } : {})}
            >
            <div className={classes.modal}>
                <BodyModal item={props.item} id={props.id} loading={props.loading} />
            </div>
            </Grow>
        </Modal>
    )
}

export default ModalDetails