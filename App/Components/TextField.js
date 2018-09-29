import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TextInputStyle'

// TODO: Add font styling here, so it can be used anywhere.
// size refer to the activity indicator's size.

export default class TextField extends Component {
  static defaultProps = {
    password: false
  }

  render () {
    const { onChangeText, style, value, placeholder, secure } = this.props
    const textStyle = {
      ...style
    }
    return (
      <TextInput
        style={styles.container}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        underlineColorAndroid ='transparent'
      />
    )
  }
}

TextField.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.string
}
