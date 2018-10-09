export default {
  // Functions return fixtures
  getStaffs: () => {
    return {
      ok: true,
      data: require('../Fixtures/utsdummydatabase.json')
    }
  },
  getStudents: () => {
    return {
      ok: true,
      data: require('../Fixtures/utsdummydatabase.json')
    }
  }
}
