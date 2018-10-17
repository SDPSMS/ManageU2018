import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TextInputStyle'

// size refer to the activity indicator's size.

export default class TextField extends Component {
  static defaultProps = {
    password: false
  }

  render () {
    const { onChangeText, value, placeholder, secure } = this.props
    return (
      <TextInput
        style={styles.container}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        underlineColorAndroid='transparent'
      />
    )
  }
}

TextField.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.string
}
