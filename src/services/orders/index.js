import * as apiRequester from '../api_requester'
import ListOrdersRequest from './requests/list_orders'
import UpdateStatusRequest from './requests/update_status'

export async function listOrders () {
  const request = new ListOrdersRequest.Builder().build()
  const response = await apiRequester.send(request)
  return response && response.data
}

export async function updateStatus (code, newStatus) {
  const request = new UpdateStatusRequest(code, newStatus)
  const response = await apiRequester.send(request)
  return response && response.data
}
