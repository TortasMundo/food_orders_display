import axios from 'axios'
import config from '../config'
import moment from 'moment-timezone'

export async function send(request) {
  const info = {
    method: request.method,
    url: config.API_URL + '/' + request.path,
    data: JSON.stringify(request.payload),
    headers: {
      'Content-Type': 'application/json',
      'timezone': moment.tz.guess()
    }
  }
  console.log('info', info)
  try {
    return await axios(info)
  } catch (err) {
    console.log(request.uri + '/' + request.path, info)
    console.log(err)
  }
}
