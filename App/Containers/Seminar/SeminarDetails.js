import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { editSeminar, deleteSeminar, unselectSeminar, loadAttendees } from '../../Action/SeminarAction'
import { attendSeminar, attendSeminarFinish } from '../../Action/AttendeeAction'
import ModalDialog from '../../Components/ModalDialog'
import RoundedButton from '../../Components/RoundedButton'
import TextField from '../../Components/TextField'
import styles from '../Styles/ContainerStyle'
import ConvertToDate from '../../Transforms/ConvertTimestampToDate'
import _ from 'lodash'
import MessageText from '../../Components/MessageText'
import BackButton from '../../Components/BackButton'
import Details from '../../Components/Details'
import CustomDropdown from '../../Components/Dropdown'

class SeminarDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      name: '',
      status: ''
    }
  }

  // TODO: Might not be a good idea to put it here. --> Put it in actions?
  renderEditAndCancelButton () {
    const {myseminar} = this.props
    if (this.props.user != null) {
      const myseminararray = []
      if (myseminar != null) {
        Object.keys(myseminar).map(index => {
          myseminararray.push(myseminar[index].id)
        })
        if (_.includes(myseminararray, this.props.seminar.id)) {
          return (
            <View>
              <SimpleIcon
                name={'settings'}
                size={30}
                onPress={() => this.props.editSeminar(this.props.seminar)}
              />

              <SimpleIcon
                name={'minus'}
                size={30}
                onPress={() => this.props.deleteSeminar(this.props.seminar.id)}
              />
            </View>
          )
        }
      }
    }
  }

  attendSeminar () {
    this.props.attendSeminar(this.state.name, this.state.email, this.state.status, this.props.seminar.id)
  }

  finishAttendSeminar () {
    this.setState({showModal: false})
    this.props.attendSeminarFinish()
  }

  // TODO: The Display attendees button should not have that function when clicked (should only move the screen).
  renderDetails () {
    const {endDate, startDate} = this.props.seminar
    const date = ConvertToDate(endDate, 'LL')
    const endTime = ConvertToDate(endDate, 'LT')
    const startTime = ConvertToDate(startDate, 'LT')
    const dropDownMenu = [
      {value: 'going'},
      {value: 'interested'}
    ]

    let dialogContent = (
      <View>
        <TextField
          placeholder={'Name'}
          onChangeText={(value) => this.setState({name: value})}
        />
        <TextField
          placeholder={'Email'}
          onChangeText={(value) => this.setState({email: value})}
        />
        <CustomDropdown data={dropDownMenu}
                        label={'Status'}
                        value={this.state.status}
                        onChangeText={(status) => this.setState({status})} />
        <MessageText>{this.props.message}</MessageText>
      </View>
    )

    return (
      <View style={styles.container}>
        <BackButton
          onPress={() => this.props.unselectSeminar()}
        />
        {this.renderEditAndCancelButton()}

        {/* Title of Seminar */}
        <Text style={styles.titleText}>{this.props.seminar.label}</Text>

        {/* Seminar details */}
        <Details placeholder='Speaker' detail={this.props.seminar.speaker} />

        {/* TODO: Insert dividers between different sections.
          Look to use a table view or equivalent for seminar
          details */}

        {/* Seminar date */}
        <Text>Date</Text>
        <Text>{date}</Text>
        {/* Seminar time */}
        <Text>Time</Text>
        <Text>{startTime} - {endTime}</Text>

        <Text>Venue</Text>
        <Text>{this.props.seminar.venue}</Text>

        {/* Abstract text */}
        <Text>Abstract</Text>
        <Text>{this.props.seminar.abstract}</Text>
        <View>
          <RoundedButton text='Join' onPress={() => this.setState({showModal: true})} />
          <Button title='Display Attendees' onPress={() => this.props.navigation.navigate('SeminarAttendeesView')} />
        </View>
        <ModalDialog
          onPressPositive={() => this.attendSeminar()}
          onPressNegative={() => this.finishAttendSeminar()} children={dialogContent}
          title='Join a Seminar' isVisible={this.state.showModal} showLoading={this.props.isLoading} />
      </View>
    )
  }

  render () {
    return (
      <View>
        {this.renderDetails()}
      </View>
    )
  }
}

SeminarDetails.propTypes = {
  seminar: PropTypes.object,
  unselectSeminar: PropTypes.func.isRequired
}

const
  mapStateToProps = (state) => {
    return {
      seminar: state.seminar.seminarSelected,
      user: state.user.user,
      myseminar: state.user.myseminar,
      message: state.attendee.message,
      isLoading: state.attendee.isLoading
    }
  }

export default connect(mapStateToProps, {
  editSeminar,
  deleteSeminar,
  unselectSeminar,
  loadAttendees,
  attendSeminar,
  attendSeminarFinish
})(SeminarDetails)
