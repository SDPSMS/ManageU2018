import React, { Component } from 'react'
import { View, Text, FlatList, Button, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Colors, Metrics, Fonts } from '../../Themes/'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import styles from '../Styles/ContainerStyle'
import _ from 'lodash'
import 'core-js/es6/symbol'
import 'core-js/es6/map'
import 'core-js/fn/symbol/iterator'
import ModalDialog from '../../Components/ModalDialog'
import TextField from '../../Components/TextField'
import MessageText from '../../Components/MessageText'
import { loadAttendees } from '../../Action/SeminarAction'
import {
  deleteAttendee,
  editAttendee,
  editAttendeeStart,
  deleteAttendeeStart,
  closeModal
} from '../../Action/AttendeeAction'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import CustomDropdown from '../../Components/Dropdown'
import Share from 'react-native-share'

class AttendeeList extends Component {
  componentDidMount () {
    this.props.loadAttendees(this.props.seminarId)
  }

  constructor (props) {
    super(props)
    this.state = {
      id: '',
      mode: '',
      selectedUser: null,
      name: '',
      email: '',
      status: '',
      dropDownMenu: [
        {value: 'Going'},
        {value: 'Interested'}
      ]
    }
  }

  editAttendees () {
    const {name, email, status, selectedUser} = this.state
    const {editAttendee} = this.props
    console.log(this.state.role)
    this.state.name === '' ? this.setState({name: selectedUser.name}) : console.log('resetting value because empty')
    this.state.email === '' ? this.setState({email: selectedUser.email}) : console.log('resetting value because empty')
    this.state.role === '' ? this.setState({role: selectedUser.role}) : console.log('resetting value because empty')

    editAttendee(selectedUser.id, name, status, email)
  }

  deleteAttendees (attendeeId) {
    const {deleteAttendee, seminarId} = this.props
    deleteAttendee(seminarId, attendeeId)
  }

  async createPDF () {
    const {attendeeLists} = this.props
    let text = ''
    attendeeLists.forEach((attendee) => {
      text += `<div style="width:46%; height:12.5%; float:left; border: 1px solid black; border-radius: 25px; margin: 5px; margin-left: 20px">` + '<h1 align="center">' + attendee.name + '</h1>' + `</div>`
    })

    attendeeLists.forEach((attendee) => {
      text += `<div style="width:46%; height:12.5%; float:left; border: 1px solid black; border-radius: 25px; margin: 5px; margin-left: 20px">` + '<h1 align="center">' + attendee.name + '</h1>' + `</div>`
    })

    attendeeLists.forEach((attendee) => {
      text += `<div style="width:46%; height:12.5%; float:left; border: 1px solid black; border-radius: 25px; margin: 5px; margin-left: 20px">` + '<h1 align="center">' + attendee.name + '</h1>' + `</div>`
    })

    attendeeLists.forEach((attendee) => {
      text += `<div style="width:46%; height:12.5%; float:left; border: 1px solid black; border-radius: 25px; margin: 5px; margin-left: 20px">` + '<h1 align="center">' + attendee.name + '</h1>' + `</div>`
    })

    const html = `
                    <html style="height:100%;padding:0;margin:0;">
                      <body style="height:100%;padding:0;margin: 0;">
                      ${text}
                      </body>
                    </html>
                  `

    let options = {
      html: html,
      fileName: 'attendees',
      directory: 'docs'
    }

    await RNHTMLtoPDF.convert(options).then(filePath => {
      Share.open({
        title: 'Share this!',
        message: 'I just wanted to show you this:',
        url: filePath.filePath,
        subject: 'I am only visible for emails :('
      })
    })
  }

  renderPrintButton () {
    const {seminar, user} = this.props
    if (user != null && seminar != null) {
      return seminar.ownerid === user.id ? (<Button title='Create PDF' onPress={() => this.createPDF()} />) : ''
    }
  }

  renderDialog () {
    const {selectedUser, id} = this.state

    let dialogContent
    let onPressPositive
    let title
    switch (this.state.mode) {
      case 'edit':
        title = 'Edit an Attendee'
        onPressPositive = () => this.editAttendees()
        dialogContent = (
          <View>
            <TextField
              placeholder={'name'}
              value={selectedUser.name}
              onChangeText={(name) => this.setState({name})}
            />
            <TextField
              placeholder={'name'}
              value={selectedUser.email}
              onChangeText={(email) => this.setState({email})}
            />
            <CustomDropdown data={this.state.dropDownMenu}
                            label={'Status'}
                            value={selectedUser.status}
                            onChangeText={(status) => this.setState({status})} />
            <MessageText>{this.props.error}</MessageText>
          </View>
        )
        break
      case 'delete':
        title = 'Delete an Attendee'
        onPressPositive = () => this.deleteAttendees(id)
        dialogContent = (
          <View>
            <Text style={{verticalAlign: 'middle'}}>Are you sure you want to delete this attendee?</Text>
          </View>
        )
        break
      default:
    }
    return (
      <ModalDialog
        confirmText='Confirm'
        negativeText='Cancel'
        onPressPositive={onPressPositive}
        showLoading={this.props.isLoading}
        onPressNegative={() => this.props.closeModal()} children={dialogContent}
        title={title} isVisible={this.props.showModal} />
    )
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.navigation.popToTop()}
        />
        <Text style={styles.sectionText}>List of Attendees</Text>
        <MessageText>{this.props.message}</MessageText>
        <FlatList
          data={this.props.attendeeLists}
          renderItem={
            ({item}) =>
              <View style={{flexDirection: 'row', margin: 10, borderBottomWidth: 3, borderBottomColor: Colors.cloud}}>
                <View style={{flex: 2, marginLeft: 10, marginTop: 5}}>
                  <Text>Email: {item.email}</Text>
                  <Text>Name: {item.name}</Text>
                  <Text>Status: {item.status}</Text>
                </View>
                <View style={{flex: 1, marginRight: 10}}>
                  <View style={{marginBottom: 10}}>
                    <Button title='Edit'
                            onPress={() => {
                              this.setState({showModal: true, selectedUser: item, mode: 'edit'})
                              this.props.editAttendeeStart()
                            }} />
                  </View>
                  <View style={{marginBottom: 10}}>
                    <Button title='Delete' color={Colors.fire}
                            onPress={() => {
                              this.setState({showModal: true, id: item.id, mode: 'delete'})
                              this.props.deleteAttendeeStart()
                            }}
                    />
                  </View>
                </View>
              </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        {this.renderDialog()}
        {this.renderPrintButton()}
      </View>
    )
  }
}

AttendeeList.propTypes = {
  attendeeLists: PropTypes.array
}

function mapStateToProps (state) {
  return {
    attendeeLists: state.attendee.seminarAttendees,
    seminar: state.seminar.seminarSelected,
    seminarId: state.seminar.seminarSelected.id,
    user: state.user.user,
    showModal: state.attendee.showModal,
    error: state.attendee.error,
    isLoading: state.attendee.isLoading
  }
}

export default connect(mapStateToProps, {
  deleteAttendee,
  loadAttendees,
  editAttendee,
  editAttendeeStart,
  deleteAttendeeStart,
  closeModal
})(AttendeeList)
