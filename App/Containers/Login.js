import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { MKColor, MKTextField, MKButton } from 'react-native-material-kit'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Loader from '../components/Loader'
// import { login } from '../actions/user'
// import AccentButton from '../components/AccentButton'
// import TextField from '../components/TextField'
import styles from './Styles/ContainerStyle'

export default class Login extends Component {
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
    // return (
    //   this.props.isLoading ? <Loader size='large'/> :
    //     <AccentButton text='Login' onPress={() => this.props.login(this.state.email, this.state.password)}/>
    // )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.sectionText}>Login</Text>

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
