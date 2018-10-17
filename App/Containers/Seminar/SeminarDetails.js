import React, { Component } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
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
  componentWillMount () {
    this.props.loadAttendees(this.props.seminar.id)
  }

  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      name: '',
      status: ''
    }
  }

  attendSeminar () {
    this.props.attendSeminar(this.state.name, this.state.email, this.state.status, this.props.seminar.id)
  }

  finishAttendSeminar () {
    this.setState({showModal: false})
    this.props.attendSeminarFinish()
  }

  renderEditAndCancelButton () {
    const {user, seminar} = this.props
    if (user !== null && seminar.ownerid === user.id) {
      return (
        <View style={{flexDirection: 'row',}}>
          <SimpleIcon
            name={'settings'}
            size={30}
            color='#517fa4'
            onPress={() => this.props.editSeminar(this.props.seminar)}
            style={{marginLeft: 20}}
          />

          <SimpleIcon
            name={'minus'}
            size={30}
            color='#517fa4'
            onPress={() => this.props.deleteSeminar(this.props.seminar.id)}
            style={{marginLeft: 20}}
          />
        </View>
      )
    }
  }

  showJoinButton () {
    const {seminar, user} = this.props
    if (user == null) {
      return (
        <RoundedButton text='Join' onPress={() => this.setState({showModal: true})} />
      )
    } else if (user.id !== seminar.ownerid) {
      return (
        <RoundedButton text='Join' onPress={() => this.setState({showModal: true})} />
      )
    }
  }

  renderDetails () {
    const {endDate, startDate} = this.props.seminar
    const date = ConvertToDate(endDate, 'LL')
    const endTime = ConvertToDate(endDate, 'LT')
    const startTime = ConvertToDate(startDate, 'LT')
    const dropDownMenu = [
      {value: 'Going'},
      {value: 'Interested'}
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
        <View style={{flexDirection: 'row'}}>
          <BackButton onPress={() => this.props.unselectSeminar()} />
          {this.renderEditAndCancelButton()}

        </View>
        {/* Title of Seminar */}
        <Text style={styles.semDetailsText}>{this.props.seminar.label}</Text>
        <Text />
        {/* Seminar details */}
        <Details placeholder='Speaker: ' style={styles.seminardetailsText} detail={this.props.seminar.speaker} />s

        {/* Title of Seminar */}
        <Text style={styles.semDetailsText}>{this.props.seminar.label}</Text>
        <Details placeholder='Abstract: ' style={styles.seminardetailsText} detail={this.props.seminar.seminardesc} />
        <Text />
        {/* Seminar details */}
        <Details placeholder='Speaker: ' style={styles.seminardetailsText} detail={this.props.seminar.speaker} />

        {/* Abstract text */}
        <Details placeholder='Speaker Bio: ' detail={this.props.seminar.abstract} />

        {/* Seminar date */}
        <Details style={styles.seminardetailsText} placeholder='Date: ' detail={date} />
        {/* Seminar time */}
        <Details placeholder='Time: ' detail={startTime + ' - ' + endTime} />

        <Details placeholder='Venue: ' detail={this.props.seminar.venue} />

        <Details placeholder='Venue Capacity: ' detail={this.props.seminar.venueCapacity} />

        <Details placeholder='Organiser Name: ' detail={this.props.seminar.ownername} />

        <Text />
        <Text />
        <Text />
        <Text />

      </ScrollView>

    {this.showJoinButton()}
    <View>
      <RoundedButton text='Display Attendees'
                     onPress={() => this.props.navigation.navigate('SeminarAttendeesView')} />
    </View>

    < ModalDialog
    onPressPositive = {()
  =>
    this.attendSeminar()
  }
    onPressNegative = {()
  =>
    this.finishAttendSeminar()
  }
    children = {dialogContent}
    title = 'Join a Seminar'
    isVisible = {this.state.showModal
  }
    showLoading = {this.props.isLoading
  }
    />
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
      message: state.attendee.message,
      isLoading: state.attendee.isLoading,
      attendeeLists: state.attendee.seminarAttendees
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
