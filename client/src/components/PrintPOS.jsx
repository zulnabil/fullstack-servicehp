import React from 'react'
import axios from 'axios'
import './PrintPreview.css'
import Recta from 'recta'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')

const printer = new Recta('12345678', '1811')

export default function PrintPOS(props) {
  const [oneload, setOneload] = React.useState({
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
    total_fee: 0,
    down_payment: 0,
    must_pay: 0,
    create_date: new Date(),
    due_date: new Date(),
    checkin_signature: ''
  })

  const [redirect, setRedirect] = React.useState(false)

  React.useEffect(() => {
    axios.get('https://us-central1-uniq-servishp.cloudfunctions.net/app/api/'+props.match.params.id)
      .then((res) => {
        // console.log(res.data)
        setOneload(res.data.data)
        console.log(res.data.data)
      })
  }, [])

  const style = {
    container: {
      maxWidth: 500,
      margin: '50px auto 0',
      textAlign: 'left',
      padding: 20,
      lineHeight: 0,
      fontSize: 12
    },
    parentGrid: {
      display: 'flex',
      margin: 0,
      lineHeight: 0
    },
    childGrid: {
      flex: 1,
      lineHeight: 0
    },
    hr: {
      backgroundColor: 'black',
      height: '2px',
      border: 'none',
      margin: 0
    }
  }
  const toCurrency = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0
  })

  function handlePrint() {
    if (!redirect) {
      printer.open().then(function () {
        printer.reset()
          .mode('B', 'true', 'true', 'true', 'true')
          .align('center')
          .text('UNIQ SERVIS HP')
          .text('082240161138')
          .text('----------------')
          .mode('false')
          .feed(1)
          .align('left')
          .text('Nama     : '+name_owner)
          .text(brand_hp+' '+type_hp+' ('+color_hp+')')
          .text('Kerusakan :')
          problems.map((problem) => {
                return printer.text(problem.name + ' \t      Rp' + toCurrency.format(problem.fee))
          })
        printer.align('left')
          .text('--------------------------------')
          .text('Total biaya \t      Rp' + toCurrency.format(total_fee))
          .text('Uang muka \t      Rp' + toCurrency.format(down_payment))
          .bold(true)
          .text('Harus dibayar \t      Rp' + toCurrency.format(must_pay))
          .bold(false)
          .feed(1)
          .text('Masuk pada :\n'+moment(create_date).format('LLL'))
          .text('Dapat diambil dari :\n'+moment(due_date).format('LLL')+'\nhingga \n'+moment(due_date).add(14, 'days').format('LLL'))
          .feed(1)
          .bold(true)
          .text('*Pengambilan harus dengan nota'.toUpperCase())
          .bold(false)
          .feed(1)
          .align('center')
          .barcode('CODE128', 'UNIQSERVISHP', '70')
          .cut()
          .print()
      })
    }
  }

  const { name_owner, phone_number_owner, brand_hp, type_hp, color_hp, problems, total_fee, down_payment, must_pay, create_date, due_date } = oneload

  if (oneload.brand_hp) {
    handlePrint()
    setTimeout(() => setRedirect(true), 5000)
  }

  if (redirect) {
    return <Redirect to='/' />
  }

  return (oneload !== null) ? (
    <div style={style.container}>
      <p style={{ textAlign: 'center' }}>Printing...</p>
    </div>
  ) : (
    <p>Get Informations...</p>
  )
}