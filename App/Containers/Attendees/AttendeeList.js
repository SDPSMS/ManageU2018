import React, { Component } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
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
import { deleteAttendee } from '../../Action/AttendeeAction'

class AttendeeList extends Component {
  componentDidMount () {
    console.log(this.props.seminarId)
    this.props.loadAttendees(this.props.seminarId)
  }

  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      id: ''
    }
  }

  deleteAttendees (attendeeId) {
    const { deleteAttendee, seminarId } = this.props
    deleteAttendee(seminarId, attendeeId)
    this.setState({ showModal: false })
  }

  render () {
    let dialogContent = (
      <View>
        <Text style={{ verticalAlign: 'middle' }}>Are you sure you want to delete this attendee?</Text>
      </View>
    )

    return (
      <View>
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.navigation.pop()}
        />
        <Text style={styles.sectionText}>List of Attendees</Text>
        <FlatList
          data={this.props.attendeeLists}
          renderItem={
            ({ item }) =>
              <View style={{ flexDirection: 'row', margin: 10, borderBottomWidth: 3, borderBottomColor: Colors.cloud }}>
                <View style={{ flex: 2, marginLeft: 10, marginTop: 5 }}>
                  <Text>Email: {item.email}</Text>
                  <Text>Name: {item.name}</Text>
                </View>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <View style={{ marginBottom: 10 }}>
                    <Button title='Edit' />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Button title='Delete' color={Colors.fire}
                      onPress={() => this.setState({ showModal: true, id: item.id })} />
                  </View>
                </View>
              </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <ModalDialog
          confirmText='Confirm'
          negativeText='Cancel'
          onPressPositive={() => this.deleteAttendees(this.state.id)}
          onPressNegative={() => this.setState({ showModal: false })} children={dialogContent}
          title='Delete an attendee' isVisible={this.state.showModal} />
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
    seminarId: state.seminar.seminarSelected.id
  }
}

export default connect(mapStateToProps, { deleteAttendee, loadAttendees })(AttendeeList)
