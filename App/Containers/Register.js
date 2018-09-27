import React, { Component } from 'react'
import styles from './Styles/ContainerStyle'
import { Text, View } from 'react-native'
import TextField from '../Components/TextField'
import RoundedButton from '../Components/RoundedButton'
import { register } from '../Action/UserAction'
import connect from 'react-redux/es/connect/connect'
import CustomDropdown from '../Components/Dropdown'

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      role: ''
    }
  }

  handleRegister () {
    this.props.register(this.state.email, this.state.password, this.state.role)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.sectionText}>You have been authenticated, Enter the email and password you want to use for
            the apps.</Text>
          <TextField placeholder='Email' value={this.state.email}
                     onChangeText={(email) => this.setState({email})} />
          <TextField placeholder='Password' value={this.state.password}
                     onChangeText={(password) => this.setState({password})} />
          <CustomDropdown
            label='Role' value={this.state.role} onChangeText={(role) => this.setState({role})}
            data={[{value: 'Organiser'}, {value: 'Host'}]}
          />
          <RoundedButton text='Register' onPress={this.handleRegister.bind(this)} />
        </View>
      </View>
    )
  }
}

export default connect(null, {register})(Register)
