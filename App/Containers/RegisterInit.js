import React, { Component } from 'react'
import styles from './Styles/ContainerStyle'
import { Text, View } from 'react-native'
import TextField from '../Components/TextField'
import RoundedButton from '../Components/RoundedButton'
import MessageText from '../Components/MessageText'
import connect from 'react-redux/es/connect/connect'
import { registerInitialisation } from '../Action/UserAction'

class RegisterInit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  handleRegister () {
    this.props.registerInitialisation(this.state.email, this.state.password)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <View style={{ marginTop: 35, marginLeft: 35 }}>
            <Text style={styles.sectionText}>Authenticate your UTS Email and password to sign up</Text>
          </View>
          <View style={{ marginLeft: 35, marginTop: 5, marginBottom: 5 }}>
            <Text style={styles.subtitleText}>*Please note that only UTS Staff may sign up</Text>
          </View>
          <TextField placeholder='Email' value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
          <TextField placeholder='Password' value={this.state.password}
            onChangeText={(password) => this.setState({ password })} />
          <MessageText>{this.props.error}</MessageText>
          <RoundedButton text='Continue' onPress={this.handleRegister.bind(this)} />
        </View>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    isLoading: state.user.isLoading,
    error: state.user.error
  }
}

export default connect(mapStateToProps, { registerInitialisation })(RegisterInit)
