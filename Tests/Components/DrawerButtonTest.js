import 'react-native'
import React from 'react'
import DrawerButton from '../../App/components/DrawerButton'

import renderer from 'react-test-renderer'

test('Drawer button renders correcty', () => {
  const tree = renderer.create(<DrawerButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
