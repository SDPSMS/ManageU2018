import API from '../../App/Services/Api'
import FixtureAPI from '../../App/Services/FixtureApi'
import R from 'ramda'

// test('All fixtures map to actual API', () => {
//   const fixtureKeys = R.keys(FixtureAPI).sort()
//   const apiKeys = R.keys(API.create())
//
//   const intersection = R.intersection(fixtureKeys, apiKeys).sort()
//
//   // There is no difference between the intersection and all fixtures
//   expect(R.equals(fixtureKeys, intersection)).toBe(true)
// })

test('FixtureAPI getStaffs returns the right file for UTS Dummy Database', () => {
  const expectedFile = require('../../App/Fixtures/utsdummydatabase.json')

  expect(FixtureAPI.getStaffs()).toEqual({
    ok: true,
    data: expectedFile
  })
})

test('FixtureAPI getStudents returns the right file for UTS Dummy Database', () => {
  const expectedFile = require('../../App/Fixtures/utsdummydatabase.json')

  expect(FixtureAPI.getStudents()).toEqual({
    ok: true,
    data: expectedFile
  })
})
