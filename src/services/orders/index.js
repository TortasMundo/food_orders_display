import * as apiRequester from '../api_requester'
import ListOrdersRequest from './requests/list_orders'

export async function listOrders () {

  const request = new ListOrdersRequest.Builder().build()
  const response = await apiRequester.send(request)
  debugger
  return response.data
}

