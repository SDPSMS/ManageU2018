import React, { Component } from 'react'
import { View, Text, FlatList,Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Colors, Metrics, Fonts } from '../../Themes/'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import styles from '../Styles/ContainerStyle'
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
        <Text style={styles.sectionText}>List of Attendees</Text>
        <FlatList
          data={this.props.attendeeLists}
          renderItem={
            ({ item }) =>
              <View style={{ flexDirection:"row", margin:10, borderBottomWidth:3,borderBottomColor:Colors.cloud}}>
                <View style={{flex:2, marginLeft:10, marginTop:5}} > 
                  <Text style={{}}>Attendee</Text>
                  <Text>Email: {item.email}</Text>
                  <Text>Name: {item.name}</Text>
                </View>
                <View style={{ flex:1,marginRight:10}}>
                  <View style={{marginBottom:10}}>
                    <Button title="Edit"  ></Button>
                  </View>
                  <View style={{marginBottom:10}}>
                    <Button title="Delete" color={Colors.fire}></Button>
                  </View>
                  
                </View>
              </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

AttendeeList.propTypes = {
  attendeeLists: PropTypes.array
}

function mapStateToProps (state) {
  return {
    attendeeLists: state.attendee.seminarAttendees
  }
}

export default connect(mapStateToProps, null)(AttendeeList)
