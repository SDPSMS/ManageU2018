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
import { deleteAttendee, editAttendee } from '../../Action/AttendeeAction'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import CustomDropdown from '../../Components/Dropdown'

class AttendeeList extends Component {
  componentWillMount () {
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
        {value: 'going'},
        {value: 'interested'}
      ]
    }
  }

  editAttendees () {
    const {name, status, selectedUser} = this.state
    if (this.state.name === '') {
      console.log('please change something!')
    } else {
      const {editAttendee} = this.props
      editAttendee(selectedUser.id, name, status, selectedUser.email)
      this.setState({showModal: false})
    }
  }

  deleteAttendees (attendeeId) {
    const {deleteAttendee, seminarId} = this.props
    deleteAttendee(seminarId, attendeeId)
    this.setState({showModal: false})
  }

  // createPDF () {
  //   const {attendeeLists} = this.props
  //   console.log(attendeeLists)
  // }

  async createPDF () {
    const {attendeeLists} = this.props
    let text = ''

    attendeeLists.forEach((attendee) => {
      console.log(attendee)
      text += `<div style="width:46%; height:15%; float:left; border: 1px solid black; margin: 5px; margin-left: 20px">` + '<h1 align="center">' + attendee.name + '</h1>' + `</div>`
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
      fileName: 'test',
      directory: 'docs'
    }

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath)
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
            <CustomDropdown data={this.state.dropDownMenu}
                            label={'Status'}
                            value={selectedUser.status}
                            onChangeText={(status) => this.setState({status})} />
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
        onPressNegative={() => this.setState({showModal: false})} children={dialogContent}
        title={title} isVisible={this.state.showModal} />
    )
  }

  render () {
    return (
      <View>
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.navigation.popToTop()}
        />
        <Text style={styles.sectionText}>List of Attendees</Text>
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
                            onPress={() => this.setState({showModal: true, selectedUser: item, mode: 'edit'})} />
                  </View>
                  <View style={{marginBottom: 10}}>
                    <Button title='Delete' color={Colors.fire}
                            onPress={() => this.setState({showModal: true, id: item.id, mode: 'delete'})} />
                  </View>
                </View>
              </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        {this.renderDialog()}
        <Button title='Create PDF' onPress={() => this.createPDF()} />
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
    seminarId: state.seminar.seminarSelected.id,
    showModal: state.attendee.showModal
  }
}

export default connect(mapStateToProps, {deleteAttendee, loadAttendees, editAttendee})(AttendeeList)
