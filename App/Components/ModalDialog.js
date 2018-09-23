import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native'
import Modal from 'react-native-modal'
import styles from './Styles/ModalDialogStyles'

//size refer to the activity indicator's size.


export default class ModalDialog extends Component {

  static defaultProps = {
    negativeText: 'Cancel',
    confirmText: 'Register',
  }

  render () {
    const {children, isVisible, title, confirmText, negativeText, onPressPositive, onPressNegative} = this.props
    return (
      <Modal transparent={true} isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            {children}
            <View style={{marginTop: 20}}>
              <Button onPress={onPressPositive} title={confirmText}/>
              <Button onPress={onPressNegative} title={negativeText}/>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

ModalDialog.propTypes = {
  isVisible: PropTypes.bool,
}
