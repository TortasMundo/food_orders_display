import axios from 'axios'
import config from '../config'

export async function send(request) {
  const info = {
    method: request.method,
    url: config.API_URL + '/' + request.path,
    data: JSON.stringify(request.payload),
    headers: {
      'Content-Type': 'application/json'
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

module.exports = {
  send
}
