import React, { Component } from 'react'

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import RNHTMLtoPDF from 'react-native-html-to-pdf'

export default class Print extends Component {
  async createPDF () {
    const studentsName = ['Limyandi Vicotrico', 'Weghanasa Cendana', 'Sasaki Rina', 'Alviandy', 'Leonardo Thenov', 'Gaki Yi', 'Xinyi Ye', 'Krystal Jung', 'James Jung', 'Kiroro hara', 'Gemu', 'Shanti Asanaa Girararo', 'Kirana Hasan', 'Genenesis', 'Ginananana']
    let text = ''

    studentsName.forEach((student) => {
      text += `<div style="width:46%; height:15%; float:left; border: 1px solid black; margin: 5px; margin-left: 20px">` + '<h1 align="center">' + student + '</h1>' + `</div>`
    })

    const html = `
<html style="height:100%;padding:0;margin:0;">
  <body style="height:100%;padding:0;margin: 0;">
    ${text}
  </body>
</html>`

    let options = {
      html: html,
      fileName: 'test',
      directory: 'docs'
    }

    let file = await RNHTMLtoPDF.convert(options)
  }

  render () {
    return (
      <View>
        <TouchableHighlight onPress={this.createPDF}>
          <Text>Create PDF</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
