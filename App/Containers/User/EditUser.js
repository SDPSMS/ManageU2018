import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import { saveUser } from '../../Action/UserAction'
import AccentButton from '../../Components/RoundedButton'
import TextField from '../../Components/TextField'
import CustomDropdown from '../../Components/Dropdown'
import * as types from '../../Types/userType'
import MessageText from '../../Components/MessageText'
import { Colors, Metrics, Fonts } from '../../Themes/'

class EditUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.selectedUser.name,
      role: props.selectedUser.role
    }
  }

  onUpdatePressed () {
    const { email, id } = this.props.selectedUser
    const { name, role } = this.state
    // The actions.
    this.props.saveUser({ id, name, email, role })
  }

  render () {
    const { selectedUser } = this.props
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: Metrics.baseMargin,
          backgroundColor: Colors.background,
          marginBottom: 50 }}>
          <Text style={{ color: Colors.primaryTextColour,
            alignSelf: 'center',
            fontWeight: 'bold',
            paddingTop: 50,
            paddingBottom: 30,
            fontSize: 45,
            fontStyle: 'italic' }}>EDIT USER</Text>
          <Text>        Name </Text>
          <TextField
            placeholder={'name'}
            value={selectedUser.name}
            onChangeText={(name) => this.setState({ name })}
          />
          <CustomDropdown
            label='Role' value={this.state.role} onChangeText={(role) => this.setState({ role })}
            data={[{ value: types.ORGANISER }]}
          />
          <MessageText>{this.props.error}</MessageText>
          <AccentButton
            text={'Update'}
            onPress={this.onUpdatePressed.bind(this)}
          />
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 20
  }
})

// the redux function.
const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
    error: state.user.error
  }
}

export default connect(mapStateToProps, { saveUser })(EditUser)
