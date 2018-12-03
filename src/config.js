module.exports = {
  get API_URL() {
    if (window.location.href === 'https://tortasmundo-orders-display.herokuapp.com/') {
      return `https://tortasmundo-kitchen-api.herokuapp.com`
    }
    if (window.location.href === 'http://tortasmundo-kitchen-web-ui-129681185.us-east-2.elb.amazonaws.com/') {
      return 'http://tortasmundo-kitchen-api-1604690468.us-east-2.elb.amazonaws.com'
    }
    if (window.location.href === 'http://ec2-18-218-154-49.us-east-2.compute.amazonaws.com:6000/') {
      return 'http://ec2-18-218-154-49.us-east-2.compute.amazonaws.com:5000'
    }
    return  'http://localhost:5000'
  },
  mocks: {
    store_location: {
      latitude: '28.1867348',
      longitude: '-105.4608849'
    }
  }
}
