module.exports = {
  API_HOST: process.env.KITCHEN_API_URL || 'http://localhost:4000',
  get API_URL() {
    return `${this.API_HOST}`
  },
  mocks: {
    delivererLocation: {
      latitude: '28.1867348',
      longitude: '-105.4608849'
    }
  }
}
