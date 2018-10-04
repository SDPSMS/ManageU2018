import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../Action/UserAction'
import styles from './Styles/ContainerStyle'
import RoundedButton from '../Components/RoundedButton'
import TextField from '../Components/TextField'
import Loader from '../Components/Loader'
import MessageText from '../Components/MessageText'

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
    return (
      this.props.isLoading ? <Loader size='large' />
        : <RoundedButton text='Login' onPress={() => this.props.login(this.state.email, this.state.password)} />
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
          <Text style={styles.sectionText}>ManageU</Text>
          <Text />
          <Text />
          <TextField placeholder='  Email Address' value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
          <TextField placeholder='  Password' value={this.state.password}
            onChangeText={(password) => this.setState({ password })} secure />

          <Text />
          {this.renderLoad()}
          <MessageText>
            {this.props.error}
          </MessageText>

          <Text style={{ color: 'blue', fontSize: 15, alignItems: 'center', alignSelf: 'center' }}
            onPress={() => LinkingIOS.openURL('')}>
            Are you new? Sign Up !
          </Text>
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
