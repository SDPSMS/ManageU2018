import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/MessageTextStyles'

export default class AlertText extends Component {
  render () {
    return (
      <Text style={styles.container}>
        {this.props.children}
      </Text>
    )
  }
}

AlertText.propTypes = {

}
