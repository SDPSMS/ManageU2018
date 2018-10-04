import React, { Component } from 'react'
import styles from './Styles/ContainerStyle'
import { Text, View } from 'react-native'
import TextField from '../Components/TextField'
import RoundedButton from '../Components/RoundedButton'
import { register } from '../Action/UserAction'
import connect from 'react-redux/es/connect/connect'
import CustomDropdown from '../Components/Dropdown'
import Loader from '../Components/Loader'
import AlertText from '../Components/AlertText'

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      role: '',
      error: ''
    }
  }

  // TODO: Handling register should be in the backend.
  handleRegister () {
    this.setState({ error: '' })
    this.props.register(this.state.email, this.state.password, this.state.role)
    this.setState({ error: 'Please enter a valid email and password to register' })
  }

  renderLoad () {
    return (
      this.props.isLoading ? <Loader size='large' />
        : <RoundedButton text='Register' onPress={() => this.handleRegister()} />
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.sectionText}>You have been authenticated, Enter the email and password you want to use for
            the apps.</Text>
          <TextField placeholder='Email' value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
          <TextField placeholder='Password' value={this.state.password}
            onChangeText={(password) => this.setState({ password })} />
          <CustomDropdown
            label='Role' value={this.state.role} onChangeText={(role) => this.setState({ role })}
            data={[{ value: 'Organiser' }, { value: 'Host' }]}
          />
          {this.renderLoad()}
          <AlertText>
            {this.state.error}
          </AlertText>
        </View>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    isLoading: state.user.isLoading
  }
}

export default connect(mapStateToProps, { register })(Register)
