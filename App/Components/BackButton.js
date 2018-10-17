import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'

export default class BackButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  static defaultProps = {
    onPress: () => console.log('back button pressed')
  }

  render () {
    const { onPress } = this.props
    // TODO: Change the back icons.
    return (
      <Icon
        name={'md-arrow-back'}
        size={30}
        color='#517fa4'
        onPress={onPress}
        style={{marginLeft:10}}
      />
    )
  }
}
