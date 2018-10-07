import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from './Styles/ContainerStyle'

export default class Help extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.sectionText}>Help</Text>
          <Text style={styles.titleText}>Getting Started</Text>
          <Text>
          Use the navigation menu on the top left corner of the screen to access the various menus of ManageU.
          The Home menu item will bring you to the main menu, you can search and select different seminars to register for.
            {'\n\n'}
          Tapping on a seminar item will bring up its detail page. From there you can register for the seminar.
          You do not need to login in order to register for a seminar, just provide your email address when prompted.
            {'\n\n'}
          </Text>

          <Text style={styles.titleText}>I can't access certain options</Text>
          <Text>
          Ensure that you are logged into the appropriate account, which as access to the options. You may login and logout
          from the navigation drawer. Once you login, additional options will be available in the navigation drawer.
            {'\n\n'}
          If you believe this is incorrect, please contact your administrator.
            {'\n\n'}
          </Text>

          <Text style={styles.titleText}>How do I create a new seminar?</Text>
          <Text>
          Ensure you are logged into an account that has the appropriate priviliges to create and manage seminars.
            {'\n\n'}
          Open the navigation drawer and select '', from there, fill in the required information about the seminar you wish
          to host. Once you have gone through the setup process, the seminar will be visible in the 'Home' screen.
            {'\n\n'}
          </Text>

          <Text style={styles.titleText}>How do I edit a seminar?</Text>
          <Text>
          Ensure you are logged into an account that has the appropriate priviliges to create and manage seminars.
            {'\n\n'}
          If you wish to edit a seminar, open the seminar's detail view, then press on the 'Edit' button.
          Once you have made changes, press the 'done' button and the changes will be saved.
          </Text>
        </ScrollView>
      </View>
    )
  }
}
