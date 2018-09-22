import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {loadAllUser} from '../../Action/UserAction'
import { connect } from 'react-redux'
import RoundedButton from '../../Components/RoundedButton'
import UserItem from './UserItem'

class UserList extends Component {
  componentDidMount() {
    this.props.loadAllUser()
  }

  render () {
    console.log(this.props.userslist)
    return (
      <View>
        <Text>Attendee Lists</Text>
        <FlatList
          data={this.props.userslist}
          renderItem={
            ({item}) =>
              <UserItem user={item}/>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <RoundedButton text='Add new User' onPress={() => this.props.navigation.push('AddUser')}/>
      </View>
    )
  }
}

UserList.propTypes = {
  loadAllUser: PropTypes.func.isRequired,
  userslist: PropTypes.array
}

function mapStateToProps (state) {
  return {
    userslist: state.user.userslist,
  }
}

export default connect(mapStateToProps, {loadAllUser})(UserList)
