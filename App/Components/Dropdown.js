import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-native-material-dropdown'
import styles from './Styles/DropdownStyles'

// size refer to the activity indicator's size.

export default class CustomDropdown extends Component {
  render () {
    const { onChangeText, value, data, label } = this.props
    return (
      <Dropdown
        containerStyle={styles.dropdownContainer}
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
