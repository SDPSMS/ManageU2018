import React, { Component } from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown'
import styles from './Styles/DropdownStyles'

// TODO: Add font styling here, so it can be used anywhere.
// size refer to the activity indicator's size.

export default class SearchDropdown extends Component {
  render () {
    const { onChangeText, value, data, label, onItemSelect } = this.props
    return (
      <SearchableDropdown
        containerStyle={styles.dropdownContainer}
        textInputStyle={styles.textInputStyle}
        itemStyle={styles.itemStyle}
        itemTextStyle={styles.itemTextStyle}
        itemsContainerStyle={styles.itemsContainerStyle}
        placeholder={label}
        items={data}
        defaultIndex={1}
        value={value}
        resetValue={false}
        underlineColorAndroid='transparent'
        onTextChange={onChangeText}
        onItemSelect={onItemSelect}
      />
    )
  }
}
