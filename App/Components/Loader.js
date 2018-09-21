import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View } from 'react-native'

/**
 * Component to create a loader (indicating that something is working on the background
 * @param size determine the size of loader
 * @returns {*}
 * @constructor
 */
// size refer to the activity indicator's size.
const Loader = ({ size }) => {
  return (
    <View styles={styles.loader}>
      <ActivityIndicator
        size={size || 'small'}
        color={'#0000ff'}
      />
    </View>
  )
}

export default Loader

Loader.propTypes = {
  size: PropTypes.string
}

const styles = {
  // TODO: make it to the middle. (center)
  loader: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}
