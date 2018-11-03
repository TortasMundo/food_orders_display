module.exports = {
  get API_URL() {
    return window.location.href === 'https://tortasmundo-orders-display.herokuapp.com/'
      ? `tortasmundo-kitchen-api-1927554484.us-east-2.elb.amazonaws.com` : 'http://localhost:4000'
  },
  mocks: {
    store_location: {
      latitude: '28.1867348',
      longitude: '-105.4608849'
    }
  }
}
