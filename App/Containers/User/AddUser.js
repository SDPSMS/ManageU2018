import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { addNewUser } from '../../Action/UserAction'
import AccentButton from '../../Components/RoundedButton'
import TextField from '../../Components/TextField'
import * as types from '../../Types/userType'
import CustomDropdown from '../../Components/Dropdown'

class AddUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      role: ''
    }
  }

  // TODO: Create form component for add/updating seminar
  render () {
    const { email, name, role } = this.state
    return (
      <View>
        <TextField
          value={email}
          placeholder='Email'
          onChangeText={(email) => this.setState({ email })}
        />
        <TextField
          value={name}
          placeholder='Name'
          onChangeText={(name) => this.setState({ name })}
        />
        <CustomDropdown
          label='Role' value={this.state.role} onChangeText={(role) => this.setState({role})}
          data={[{value: types.ORGANISER}]}
        />
        <View>
          <AccentButton text='Add' onPress={() => this.props.addNewUser(email, name, role)} />
        </View>
      </View>
    )
  }
}

export default connect(null, { addNewUser })(AddUser)
