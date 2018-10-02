import React, { Component } from 'react'
import styles from './Styles/ContainerStyle'
import { Text, View } from 'react-native'
import TextField from '../Components/TextField'
// TODO: Calling it directly in react native might not be right.
import API from '../Services/Api'
import RoundedButton from '../Components/RoundedButton'
import AlertText from '../Components/AlertText'

export default class RegisterInit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      dataSource: [],
      message: ''
    }

    this.getData()
    this.sendEmail()
  }

  getData = async () => {
    const api = API.create()
    const staffs = await api.getStaffs()

    this.setState({
      dataSource: staffs.data
    })
  }

  sendEmail = async () => {
    const api = API.create()
    console.log(api.sendEmail())
    await api.sendEmail({receiver: 'limyandi@gmail.com'})
  }

  handleRegister () {
    // TODO: Continue from here tommorow.
    // change map so can break.
    this.state.dataSource.staffs.map((staff) => {
      if (staff.name === this.state.password && staff.email === this.state.email) {
        console.log('successful!')
        // should show a new register form that use their uts staff email and they can input password and username and roles --Organiser, Host?
        this.props.navigation.push('Register')
      }
    })
    this.setState({message: 'Please enter a correct UTS Staff Email and Password'})
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.sectionText}>Please Enter your UTS Staff Email and Password Note that only UTS Staff can create an account with our apps</Text>
          <TextField placeholder='Email' value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
          <TextField placeholder='Password' value={this.state.password}
            onChangeText={(password) => this.setState({ password })} />
          <AlertText>{this.state.message}</AlertText>
          <RoundedButton text='Continue' onPress={this.handleRegister.bind(this)} />
        </View>
      </View>
    )
  }
}
