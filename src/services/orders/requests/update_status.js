class Request {
  constructor(code, newStatus) {
    this.code = code
    this.newStatus = newStatus
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'orders/update_status'
  }
  get payload() {
    return {
      code: this.code,
      newStatus: this.newStatus
    }
  }
}

module.exports = Request
