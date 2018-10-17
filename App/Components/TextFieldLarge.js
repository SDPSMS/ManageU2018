import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TextInputStyle'

// size refer to the activity indicator's size.

export default class TextFieldLarge extends Component {
  static defaultProps = {
    password: false
  }

  render () {
    const { onChangeText, value, placeholder, secure } = this.props
    return (
      <TextInput
        style={styles.multilineContainer}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        multiline
        numberOfLines={4}
        underlineColorAndroid='transparent'
      />
    )
  }
}

TextFieldLarge.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.string
}
