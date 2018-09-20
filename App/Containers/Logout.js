import React, { Component } from 'react'
import { Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default class Logout extends Component {

  //TODO: Or instead of logging out directly, we can use modal dialog to ask whether user really wants to log out and
  //then waits for confirmation
  render () {
    return (
      <Button
        title='Logout'
        onPress={this.props.logout()}
      />
    )
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

// export default connect(null, {logout})(Logout);
