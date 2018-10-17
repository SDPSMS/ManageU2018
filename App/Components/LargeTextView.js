import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TextInputStyle'

// TODO: Add font styling here, so it can be used anywhere.
// size refer to the activity indicator's size.

export default class LargeTextView extends Component {
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
        multiline={true}
        numberOfLines={4}
        underlineColorAndroid='transparent'
      />
    )
  }
}

LargeTextView.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.string
}