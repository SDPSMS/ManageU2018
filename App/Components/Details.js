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
    const { detail, placeholder } = this.props
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: '#5b9aff', fontWeight: 'bold', fontSize: 16, marginLeft: 15, marginVertical: 1 }}>{placeholder}</Text>
        <Text style={{ color: 'black',
          fontSize: 15,
          marginVertical: 3,
          textAlign: 'center',
          justifyContent: 'flex-end',
          marginRight: 100
        }}>{detail} </Text>
      </View>

    )
  }
}
