export default {
  // Functions return fixtures
  getStaffs: () => {
    return {
      ok: true,
      data: require('../Fixtures/staffs.json')
    }
  },
}
