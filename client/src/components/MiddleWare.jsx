import React from 'react'
import { createAxios } from '../axios'

// pake bgini klo ko mo akses endpoint yg ta protek
const axios = createAxios('https://us-central1-uniq-servishp.cloudfunctions.net/app/api')// ok
// so bisa?
// sdh tdk ada error 401
// berarti so menger?
// lg di cerna ka hahahahaa
// 
//pas selesai login, kita dapat tokennya di body response
// kita simpan di local storage
// baru setiap kita mau request, token itu kita sertakan di header
// kalo ko liat function createAxios
// itu ada interceptors.request
// di situ, kita inject / sertakan token yg kita simpan tadi, di header x-access-token
// nanti backend baca value nya di middlware backend
// bmn?
// baru menger pas liat simpan token di localstorage di component login ka haha
// nanti lah pas internet mu bagus kita lanjut wkkw so mo ashar
// siap ka, nanti saya ke tmpt ka ija jo langsung wkwkwkokokleave 
function MiddleWare() {
  React.useEffect(() => {
    axios.get('/secret')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  })

  return (
    <p>a</p>
  )
}

export default MiddleWare