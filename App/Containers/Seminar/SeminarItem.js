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
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode={'tail'}>
          {props.seminar.label}
        </Text>

        <Text numberOfLines={1} ellipsizeMode={'tail'}>
          <Text style={styles.subtitleText}>Speaker:</Text>
          <Text> {props.seminar.speaker}</Text>
        </Text>

        <Text numberOfLines={2} ellipsizeMode={'tail'}>
          <Text style={styles.subtitleText} >Description:</Text>
          <Text> {props.seminar.abstract}</Text>
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
