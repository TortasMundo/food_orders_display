module.exports = {
  get API_URL() {
    return window.location.href === 'https://tortasmundo-orders-display.herokuapp.com/'
      ? `https://tortasmundo-kitchen-api.herokuapp.com` : 'http://localhost:4000'
  },
  mocks: {
    store_location: {
      latitude: '28.1867348',
      longitude: '-105.4608849'
    }
  }
}
