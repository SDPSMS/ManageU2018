import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import _ from 'lodash'
import 'core-js/es6/symbol'
import 'core-js/es6/map'
import 'core-js/fn/symbol/iterator'

class AttendeeList extends Component {
  render () {
    return (
      <View>
        <SimpleIcon
          name={'close'}
          size={30}
          onPress={() => this.props.navigation.pop()}
        />
        <Text>Attendee Lists</Text>
        <FlatList
          data={this.props.attendeeLists}
          renderItem={
            ({item}) =>
              <View>
                <Text style={{marginTop: 20}}>Attendee</Text>
                <Text>Email: {item.email}</Text>
                <Text>Name: {item.name}</Text>
              </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

AttendeeList.propTypes = {
  attendeeLists: PropTypes.array,
}

function mapStateToProps (state) {
  return {
    attendeeLists: state.attendee.seminarAttendees
  }
}

export default connect(mapStateToProps, null)(AttendeeList)
