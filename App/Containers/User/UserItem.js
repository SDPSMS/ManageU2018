import React from 'react'
import { Text, View, StyleSheet, Image, Button , TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectUser, deleteUser } from '../../Action/UserAction'

import { Colors, Metrics, Fonts } from '../../Themes/'




// we do not need the react lifecycle, so stateless components
const UserItem = (props) => {
  return (
    <TouchableWithoutFeedback
      // props.seminar refer to the seminar id.
      onPress={() => props.selectUser(props.user)}
    >
      <View style={{flexDirection: 'row', margin: 10, borderBottomWidth: 3, borderTopWidth: 3, borderColor: Colors.cloud}}>
                <View style={{flex: 2, marginTop: 10}}>
                <Text style={{fontSize: 17, color: 'black'}}> Email: {props.user.email}</Text>
                <Text style={{fontSize: 17, color: 'black'}}> Name: {props.user.name}</Text>
                <Text style={{fontSize: 17, color: 'black'}}> Role: {props.user.role}</Text>
                </View> 
            <View style={{marginRight: 5, marginTop: 10, flex: 0.7, marginBottom: 10}}>
            <View style={{marginBottom: 10}}>
            <Button title='Edit' onPress={() => props.selectUser(props.user)} />
            </View>
            <Button title='Delete' color={Colors.fire} onPress={() => props.deleteUser(props.user.id)} />
            </View>
        
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
