import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { editSeminar, deleteSeminar, unselectSeminar, loadAttendees } from '../../Action/SeminarAction'
import { attendSeminar } from '../../Action/AttendeeAction'
import ModalDialog from '../../Components/ModalDialog'
import RoundedButton from '../../Components/RoundedButton'
import TextField from '../../Components/TextField'
import styles from '../Styles/ContainerStyle'
import _ from 'lodash'
import MessageText from '../../Components/MessageText'

class SeminarDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      name: '',
      email: ''
    }
  }

  // TODO: Might not be a good idea to put it here. --> Put it in actions?
  renderEditAndCancelButton () {
    const {myseminar} = this.props
    if (this.props.user != null) {
      const myseminararray = []
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
            <Button title='Display Attendees' onPress={() => this.props.loadAttendees(this.props.seminar.id)} />
          </View>
        )
      }
    }
  }

  attendSeminar () {
    this.props.attendSeminar(this.state.name, this.state.email, this.props.seminar.id)
  }

  // TODO: The Display attendees button should not have that function when clicked (should only move the screen).
  renderDetails () {
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
        <MessageText>{this.props.message}</MessageText>
      </View>
    )

    return (
      <View style={styles.container}>
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.unselectSeminar()}
        />
        {this.renderEditAndCancelButton()}

        {/* Title of Seminar */}
        <Text style={styles.titleText}>{this.props.seminar.label}</Text>

        {/* Seminar details */}
        <Text>Duration</Text>
        <Text>{this.props.seminar.duration}</Text>

        <Text>Speaker</Text>
        <Text>{this.props.seminar.speaker}</Text>

        {/* TODO: Insert dividers between different sections.
          Look to use a table view or equivalent for seminar
          details */}

        {/* Seminar date */}
        <Text>Date</Text>
        <Text>{this.props.seminar.date}</Text>
        {/* Seminar time */}
        <Text>Time</Text>
        <Text>{this.props.seminar.time}</Text>

        <Text>Venue</Text>
        <Text>{this.props.seminar.venue}</Text>

        {/* Abstract text */}
        <Text>Abstract</Text>
        <Text>{this.props.seminar.abstract}</Text>
        <View>
          <RoundedButton text='Join' onPress={() => this.setState({showModal: true})} />
        </View>
        <ModalDialog
          onPressPositive={() => this.attendSeminar()}
          onPressNegative={() => this.setState({showModal: false})} children={dialogContent}
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
  attendSeminar
})(SeminarDetails)
