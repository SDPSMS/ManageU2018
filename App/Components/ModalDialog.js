import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native'
import Modal from 'react-native-modal'
import styles from './Styles/ModalDialogStyles'
import { Colors } from '../Themes'

// size refer to the activity indicator's size.

export default class ModalDialog extends Component {
  static defaultProps = {
    negativeText: 'Cancel',
    confirmText: 'Register'
  }

  render () {
    const { children, isVisible, title, confirmText, negativeText, onPressPositive, onPressNegative } = this.props
    return (
      <Modal transparent isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.textInput}>
              {children}
            </View>

            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View style={{ paddingRight: 15 }}>
                <Button onPress={onPressPositive} title={confirmText} />
              </View>
              <Button onPress={onPressNegative} title={negativeText} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

ModalDialog.propTypes = {
  isVisible: PropTypes.bool
}
