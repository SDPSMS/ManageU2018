import 'react-native'
import React from 'react'
import Loader from '../../App/Components/Loader'

import renderer from 'react-test-renderer'

test('Loader component renders correcty', () => {
  const tree = renderer.create(<Loader />).toJSON()
  expect(tree).toMatchSnapshot()
})
