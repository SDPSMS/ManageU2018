import React, { Component } from 'react'
import styles from './Styles/ContainerStyle'
import { Text, View } from 'react-native'
import TextField from '../Components/TextField'
import RoundedButton from '../Components/RoundedButton'
import { register } from '../Action/UserAction'
import connect from 'react-redux/es/connect/connect'
import CustomDropdown from '../Components/Dropdown'
import Loader from '../Components/Loader'
import MessageText from '../Components/MessageText'
import * as types from '../Types/userType'
import BackButton from '../Components/BackButton'

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      role: '',
      error: '',
      name: ''
    }
  }

  handleRegister () {
    this.props.register(this.state.email, this.state.name, this.state.password, this.state.role)
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
        <BackButton
          onPress={() => this.props.unselectSeminar()}
        />
        <View>
          <Text style={styles.subtitleText1}>You have been authenticated, Enter the email and password you want to use
            for
            the apps.</Text>
          <TextField placeholder=' Email' value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
          <TextField placeholder=' Name' value={this.state.name}
            onChangeText={(name) => this.setState({ name })} />
          <TextField placeholder=' Password' value={this.state.password} secure
            onChangeText={(password) => this.setState({ password })} />
          <CustomDropdown
            label='Role' value={this.state.role} onChangeText={(role) => this.setState({ role })}
            data={[{ value: types.ORGANISER }]}
          />
          {this.renderLoad()}
          <MessageText>
            {this.props.error}
          </MessageText>
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

export default connect(mapStateToProps, { register })(Register)
