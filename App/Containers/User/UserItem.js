import React from 'react'
import { Text, View, StyleSheet, Image, Button, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectUser, deleteUser } from '../../Action/UserAction'
import { Colors, Metrics, Fonts } from '../../Themes/'
import RoundedButton from '../../Components/RoundedButton'
import Details from '../../Components/Details'
import styles from '../Styles/ContainerStyle'

// we do not need the react lifecycle, so stateless components
const UserItem = (props) => {
  return (
    <TouchableWithoutFeedback
      // props.seminar refer to the seminar id.
      onPress={() => props.selectUser(props.user)}
    >
      <View style={styles.listContainer}>
        <View style={{ flex: 2, marginLeft: 10, marginTop: 5 }}>
          <Details placeholder='Email: ' detail={props.user.email} />
          <Details placeholder='Name: ' detail={props.user.name} />
          <Details placeholder='Role: ' detail={props.user.role} />
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
