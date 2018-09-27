import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { MKColor, MKTextField, MKButton } from 'react-native-material-kit'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Loader from '../components/Loader'
import { login } from '../Action/UserAction'
// import AccentButton from '../components/AccentButton'
// import TextField from '../components/TextField'
import styles from './Styles/ContainerStyle'
import RoundedButton from '../Components/RoundedButton'
import TextField from '../Components/TextField'
import Loader from '../Components/Loader'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  /**
   * Render a loading state when firebase is processing login.
   * @returns {*}
   */
  renderLoad () {
    console.log(this.state.email, this.state.password)
    return (
      this.props.isLoading ? <Loader size='large' />
        : <RoundedButton text='Login' onPress={() => this.props.login(this.state.email, this.state.password)} />
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.sectionText}>Login</Text>
          <TextField placeholder='Email' value={this.state.email} onChangeText={(email) => this.setState({ email })} />
          <TextField placeholder='Password' value={this.state.password} onChangeText={(password) => this.setState({ password })} secure />
          {this.renderLoad()}
          <Text>
            {this.props.error}
          </Text>
          <RoundedButton onPress={() => this.props.navigation.navigate('RegisterStack')}>
            Register
          </RoundedButton>
        </View>
      </View>
    )
  }
}

Login.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    error: state.user.error,
    isLoading: state.user.isLoading
  }
}

export default connect(mapStateToProps, { login })(Login)
