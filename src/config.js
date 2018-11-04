module.exports = {
  get API_URL() {
    if (window.location.href === 'https://tortasmundo-orders-display.herokuapp.com/') {
      return `https://tortasmundo-kitchen-api.herokuapp.com`
    }
    if (window.location.href === 'http://tortasmundo-kitchen-web-ui-1691666950.us-east-2.elb.amazonaws.com/') {
      return 'tortasmundo-kitchen-api-1927554484.us-east-2.elb.amazonaws.com'
    }
    return  'http://localhost:4000'
  },
  mocks: {
    store_location: {
      latitude: '28.1867348',
      longitude: '-105.4608849'
    }
  }
}
