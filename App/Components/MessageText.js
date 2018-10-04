import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/MessageTextStyles'

// TODO: Add font styling here, so it can be used anywhere.
// size refer to the activity indicator's size.

export default class MessageText extends Component {
  render () {
    return (
      <Text style={styles.container}>
        {this.props.children}
      </Text>
    )
  }
}

MessageText.propTypes = {

}
