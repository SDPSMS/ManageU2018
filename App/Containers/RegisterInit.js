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
    await api.sendEmail(['limyandi@gmail.com', 'lvicotrico98@gmail.com', 'limyandi.vicotrico@metigy.com'])
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
    this.setState({ message: 'Please enter a correct UTS Staff Email and Password' })
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
          <AlertText>{this.state.message}</AlertText>
          <RoundedButton text='Continue' onPress={this.handleRegister.bind(this)} />
        </View>
      </View>
    )
  }
}
