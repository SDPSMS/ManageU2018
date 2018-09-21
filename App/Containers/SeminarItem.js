import React from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/EvilIcons'
import PropTypes from 'prop-types'
import { selectSeminar } from '../Action/SeminarAction'

// loading the theme that comes with material kit, using the pre built styles.

// we do not need the react lifecycle, so stateless components
const SeminarItem = (props) => {
  return (
    <TouchableWithoutFeedback
      // props.seminar refer to the seminar id.
      onPress={() => props.selectSeminar(props.seminar)}
    >
      <View>
        <Text style={[styles.title]}>
          {props.seminar.label}
        </Text>
        <Text style={[styles.action]}>
          Speaker: {props.seminar.speaker}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20
  },
  title: {
    top: 40,
    left: 80,
    fontSize: 14
  },
  image: {
    height: 100
  },
  action: {
    backgroundColor: 'black',
    color: 'white'
  },
  // absolute position makes the icon stays in the card background
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)'
  }
})

SeminarItem.propTypes = {
  seminar: PropTypes.object,
  selectSeminar: PropTypes.func.isRequired
}

// null for null props (because we already have the props from the peoplelist)
// actions is to handle for action dispatched.
export default connect(null, { selectSeminar })(SeminarItem)
