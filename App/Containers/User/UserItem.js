import React from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectUser, deleteUser } from '../../Action/UserAction'
import RoundedButton from '../../Components/RoundedButton'
import { Colors, Metrics, Fonts } from '../../Themes/'

// we do not need the react lifecycle, so stateless components
const UserItem = (props) => {
  return (
    <TouchableWithoutFeedback
      // props.seminar refer to the seminar id.
      onPress={() => props.selectUser(props.user)}
    >
      <View style={{ borderRadius: 1 }}>
        <View style={{ flex: 2, marginLeft: 10, marginTop: 5 }}>
          <Text>Email: {props.user.email}</Text>
          <Text>Name: {props.user.name}</Text>
          <Text>Role: {props.user.role}</Text>
        </View>
        <RoundedButton text='Delete user' onPress={() => props.deleteUser(props.user.id)} />
      </View>
    </TouchableWithoutFeedback>
  )
}

UserItem.propTypes = {
  user: PropTypes.object,
  selectUser: PropTypes.func.isRequired
}

// null for null props (because we already have the props from the peoplelist)
// actions is to handle for action dispatched.
export default connect(null, { selectUser, deleteUser })(UserItem)
