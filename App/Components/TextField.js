import React, {Component} from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

//TODO: Add font styling here, so it can be used anywhere.
//size refer to the activity indicator's size.

export default class TextField extends Component {
  static defaultProps = {
    password: false,
  }

  render () {
    const {onChangeText, style, value, placeholder, secure} = this.props;
    const textStyle = {
      height: 40,
      ...style,
    }
    return (
      <TextInput
        style={textStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />
    )
  }
}

TextField.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.string,
}
