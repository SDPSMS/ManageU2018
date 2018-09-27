import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-native-material-dropdown';

// TODO: Add font styling here, so it can be used anywhere.
// size refer to the activity indicator's size.

export default class CustomDropdown extends Component {
  render () {
    const { onChangeText, value, data, label } = this.props
    return (
      <Dropdown
        label={label}
        data={data}
        value={value}
        onChangeText={onChangeText}
      />
    )
  }
}

CustomDropdown.propTypes = {

}
