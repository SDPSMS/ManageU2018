import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import * as actions from '../../Action/SeminarAction'
import ModalDialog from '../../Components/ModalDialog'
import RoundedButton from '../../Components/RoundedButton'
import TextField from '../../Components/TextField'

class SeminarDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      name: '',
      email: '',
    }
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
      </View>
    )

    return (
      <View>
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.unselectSeminar()}
        />

        <SimpleIcon
          name={'settings'}
          size={30}
          onPress={() => this.props.editSeminar(this.props.seminar)}
        />

        <SimpleIcon
          name={'minus'}
          size={30}
          onPress={() => this.props.deleteSeminar(this.props.seminar.uid)}
        />

        <Text>Abstract: {this.props.seminar.abstract}</Text>
        <Text>Label: {this.props.seminar.label}</Text>
        <Text>Date: {this.props.seminar.date}</Text>
        <Text>Duration: {this.props.seminar.duration}</Text>
        <Text>speaker: {this.props.seminar.speaker}</Text>
        <Text>Time: {this.props.seminar.time}</Text>
        <Text>Venue: {this.props.seminar.venue}</Text>
        <View>
          <RoundedButton text='Join' onPress={() => this.setState({showModal: true})}/>
        </View>
        <ModalDialog onPressPositive={() => console.log(this.state.name, this.state.email)} onPressNegative={() => this.setState({showModal: false})} children={dialogContent} title='Join a Seminar' isVisible={this.state.showModal} />
        <Button title="Display Attendees" onPress={() => this.props.loadAttendees(this.props.seminar.uid)}/>
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
  unselectSeminar: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    seminar: state.seminar.seminarSelected,
  }
}

export default connect(mapStateToProps, actions)(SeminarDetails)
