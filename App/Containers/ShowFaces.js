import React, { Component } from 'react'
import { ListView, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import API from '../Services/Api'

export default class ListViewSectionsExample extends Component {
  constructor (props) {
    super(props)
    const dataObjects = []

    const rowHasChanged = (r1, r2) => r1 !== r2

    const sectionHeaderHasChanged = (s1, s2) => s1 !== s2

    this.ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged})

    this.state = {
      dataSource: this.ds.cloneWithRowsAndSections(dataObjects)
    }

    this.getData()
  }

  getData = async () => {
    const api = API.create()
    const faces = await api.getFaces()

    this.setState({
      dataSource: this.ds.cloneWithRowsAndSections(faces.data)
    })
  }

  renderRow (rowData, sectionID) {
    console.log(rowData)
    return (
      <TouchableOpacity>
        <Text>{rowData.name}</Text>
        <Text>{rowData.email}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View>
        <ListView
          renderSectionHeader={this.renderHeader}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections
        />

      </View>
    )
  }

}
