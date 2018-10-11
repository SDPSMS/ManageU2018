import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TextInputStyle'

// TODO: Add font styling here, so it can be used anywhere.
// size refer to the activity indicator's size.

export default class Details extends Component {
  static defaultProps = {
  }

  render () {
    const {detail, placeholder} = this.props
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginRight: 50}}>{placeholder}</Text>
        <Text style={{marginRight: 30}}>{detail} </Text>
      </View>
    )
  }
}
