import React, { Component } from 'react'
import { Platform, View, Text, FlatList, Button, TouchableHighlight, PermissionsAndroid } from 'react-native'
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
import RNPrint from 'react-native-print'

class AttendeeList extends Component {
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
        { value: 'Going' },
        { value: 'Interested' }
      ]
    }
  }

  editAttendees () {
    const { name, email, status, selectedUser } = this.state
    const { editAttendee, selectedAttendee } = this.props

    editAttendee(selectedUser.id, name || selectedAttendee.name, status || selectedAttendee.status, email || selectedAttendee.email)
  }

  deleteAttendees (attendeeId) {
    const { deleteAttendee, seminarId } = this.props
    deleteAttendee(seminarId, attendeeId)
  }

  async createPDF () {
    const { attendeeLists } = this.props
    let text = null
    attendeeLists.forEach((attendee) => {
      text += `<div style="width:46%; height:12.5%; float:left; border: 1px solid black; border-radius: 25px; margin: 5px; margin-left: 20px">` + '<h1 align="center">' + attendee.name + '</h1>' + `</div>`
    })

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        'android.permission.WRITE_EXTERNAL_STORAGE'
      )
      if (!granted) {
        const response = await PermissionsAndroid.request(
          'android.permission.WRITE_EXTERNAL_STORAGE'
        )
        if (!response) {
          return
        }
      }
    }

    console.log(Platform.OS)
    const html = `
                    <html style="height:100%;padding:0;margin:0;">
                      <body style="height:100%;padding:0;margin: 0;">
                      ${text}
                      </body>
                    </html>
                  `

    if (Platform.OS === 'ios') {
      let options = {
        html: html,
        fileName: 'attendees',
        directory: 'docs',
        base64: true
      }

      await RNHTMLtoPDF.convert(options).then(filePath => {
        Share.open({
          title: 'ManageU',
          message: 'ManageU',
          url: filePath.filePath,
          subject: `Your Attendees List in Seminar ${this.props.seminar.label}`
        })
      })
    }

    if (Platform.OS === 'android') {
      const results = await RNHTMLtoPDF.convert({
        html: html,
        fileName: 'attendees'
      })

      await RNPrint.print({ filePath: results.filePath })
    }
  }

  renderPrintButton () {
    const { seminar, user } = this.props
    if (user != null && seminar != null) {
      return seminar.ownerid === user.id ? (<Button title='Create PDF' onPress={() => this.createPDF()} />) : <Text/>
    }
  }

  renderDialog () {
    const { selectedUser, id } = this.state

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
              placeholder={'Name'}
              value={this.props.selectedAttendee.name}
              onChangeText={(name) => this.setState({ name })}
            />
            <TextField
              placeholder={'Email'}
              value={this.props.selectedAttendee.email}
              onChangeText={(email) => this.setState({ email })}
            />
            <CustomDropdown data={this.state.dropDownMenu}
              label={'Status'}
              value={this.props.selectedAttendee.status}
              onChangeText={(status) => this.setState({ status })} />
            <MessageText>{this.props.error}</MessageText>
          </View>
        )
        break
      case 'delete':
        title = 'Delete an Attendee'
        onPressPositive = () => this.deleteAttendees(id)
        dialogContent = (
          <View>
            <Text style={{ verticalAlign: 'middle' }}>Are you sure you want to delete this attendee?</Text>
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
    let length = 0
    if (this.props.attendeeLists !== null) {
      length = this.props.attendeeLists.length
    }
    return (
      <View style={{ flex: 1 }}>
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.navigation.popToTop()
          }
        />
        <Text style={styles.sectionText}>List of Attendees</Text>
        <Text style={styles.subtitleText1}>Number of Attendees: {length}</Text>
        <MessageText>{this.props.message}</MessageText>
        <FlatList
          data={this.props.attendeeLists}
          renderItem={
            ({ item }) =>
              <View style={{ flexDirection: 'row', margin: 10, borderBottomWidth: 3, borderBottomColor: Colors.cloud }}>
                <View style={{ flex: 2, marginLeft: 10, marginTop: 5 }}>
                  <Text>Email: {item.email}</Text>
                  <Text>Name: {item.name}</Text>
                  <Text>Status: {item.status}</Text>
                </View>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <View style={{ marginBottom: 10 }}>
                    <Button title='Edit'
                      onPress={() => {
                        this.setState({ selectedUser: item, mode: 'edit' })
                        this.props.editAttendeeStart(item.id)
                      }} />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Button title='Delete' color={Colors.fire}
                      onPress={() => {
                        this.setState({ id: item.id, mode: 'delete' })
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
    isLoading: state.attendee.isLoading,
    message: state.attendee.message,
    selectedAttendee: state.attendee.selectedAttendee
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
