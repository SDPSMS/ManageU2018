import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

export default class BackButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  static defaultProps = {
    onPress: (props) => props.navigation.pop()
  }

  render () {
    const { onPress } = this.props
    // TODO: Change the back icons.
    return (
      <SimpleIcon
        name={'close'}
        size={30}
        onPress={onPress}
      />
    )
  }
}
