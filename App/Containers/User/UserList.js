import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { loadAllUser } from '../../Action/UserAction'
import { connect } from 'react-redux'
import RoundedButton from '../../Components/RoundedButton'
import UserItem from './UserItem'
import styles from '../Styles/ContainerStyle'
import { Colors, Metrics, Fonts } from '../../Themes/'

class UserList extends Component {
  componentDidMount () {
    this.props.loadAllUser()
  }

  render () {
    console.log(this.props.userslist)
    return (
      <View style={styles.containerHelp}>
        <Text style={styles.semDetailsText}>User Lists</Text>
        <ScrollView>
        <FlatList 
          style={{marginBottom: 50}}
          data={this.props.userslist}
          renderItem={
            ({ item }) =>
              <UserItem user={item} />
          }
          keyExtractor={(item, index) => index.toString()}
        />
          <Text></Text>
          <RoundedButton text='Add new User' onPress={() => this.props.navigation.push('AddUser')} />
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </ScrollView>
        
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
    userslist: state.user.userslist
  }
}

export default connect(mapStateToProps, { loadAllUser })(UserList)
