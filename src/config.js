module.exports = {
  API_HOST: 'https://tortasmundo-kitchen-api.herokuapp.com',
  get API_URL() {
    return `${this.API_HOST}/api`
  },
  mocks: {
    delivererLocation: {
      latitude: '28.1867348',
      longitude: '-105.4608849'
    }
  }
}
