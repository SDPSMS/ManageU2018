import React from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/EvilIcons'
import PropTypes from 'prop-types'
import { selectSeminar } from '../../Action/SeminarAction'
import styles from '../Styles/ContainerStyle'

// we do not need the react lifecycle, so stateless components
const SeminarItem = (props) => {
  return (
    <TouchableWithoutFeedback
      // props.seminar refer to the seminar id.
      onPress={() => props.selectSeminar(props.seminar)}
    >
      <View style={styles.listContainer}>
        <Text style={styles.titleText}>
          {props.seminar.label}
        </Text>
        <Text style={styles.subtitleText}>
          Speaker: {props.seminar.speaker}
        </Text>
        <Text style={styles.subtitleText} numberOfLines={2} ellipsizeMode ={'tail'}>
          Description: {props.seminar.abstract}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

SeminarItem.propTypes = {
  seminar: PropTypes.object,
  selectSeminar: PropTypes.func.isRequired
}

// null for null props (because we already have the props from the peoplelist)
// actions is to handle for action dispatched.
export default connect(null, { selectSeminar })(SeminarItem)
