import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'

import ComplexGrid from './subcomponents/ComplexGrid'
import ModalDetails from './subcomponents/ModalDetails'

import { connect } from 'react-redux'
import { listQuery, changeQuery } from '../../redux/action'

import { createAxios } from '../../axios'


const axios = createAxios('https://us-central1-uniq-servishp.cloudfunctions.net/app/api')

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 550,
      margin: '100px auto 100px'
    },
    progress: {
      margin: theme.spacing(10),
    },
  }));

function ListItem(props) {
    const classes = useStyles();

    useEffect(() => {
      if (!props.query) {
        axios.get('/')
          .then(res => {
            setPayload(res.data)
          })
          .catch(err => {
            console.error(err)
            setRedirect(true)
            // setTimeout(() => setRedirect(true), 3000)
          })
      } else {
        axios.get('https://us-central1-uniq-servishp.cloudfunctions.net/app/api/search/'+props.query)
          .then(res => {
            setPayload(res.data)
          })
      }
    }, [props.query])

    const [payload, setPayload] = React.useState(null)
    const [oneload, setOneload] = React.useState(1)
    const [showModal, setShowModal] = React.useState(false)
    const [oneLoadLoading, setOneLoadLoading] = React.useState(true)

    const getOneItem = (id) => {
      setOneLoadLoading(true)
        axios.get('https://us-central1-uniq-servishp.cloudfunctions.net/app/api/'+id)
          .then(res => {
            setOneload(res.data)
            setOneLoadLoading(false)
          })
    }

    const passModalDetails = () => {
      if (oneload) {
        return (
          <ModalDetails
              open={showModal}
              loading={oneLoadLoading}
              handleClose={() => setShowModal(false)}
              item={oneload.data}
              id={oneload.id}
            />
        )
      }
    }

    const [redirect, setRedirect] = React.useState(false)

    if (redirect) {
      return <Redirect to='/login' />
    }

    return payload !== null ? (
        <div className={classes.root}>
            {passModalDetails()}

            {payload.map((item, key) => {
                return (
                  <div key={`item-${key}`} onClick={() => { setShowModal(true); getOneItem(item.id);}}>
                    <ComplexGrid
                        item={item.data}
                    />
                  </div>
                )
            })}
        </div>
    ) : (
        <CircularProgress className={classes.progress} color="primary" />
      )
}

export default connect(listQuery, changeQuery)(ListItem)