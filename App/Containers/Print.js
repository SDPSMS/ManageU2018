import React, { Component } from 'react'

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import RNHTMLtoPDF from 'react-native-html-to-pdf'

// const html = `<html style="height:100%;padding:0;margin:0;"><body style="height:100%;padding:0;margin: 0;"><div style="width:50%; height:14%; float:left; background: #DDD"></div><div style="width:50%; height:14%; float:left; background: #777">2</div><div style="width:50%; height:14%; float:left; background:#AAA">3</div><div style="width:50%; height:14%; float:left; background:#444">4</div><div style="width:50%; height:14%; float:left; background:#444">5</div><div style="width:50%; height:14%; float:left; background:#444">6</div><div style="width:50%; height:14%; float:left; background:#444">7</div><div style="width:50%; height:14%; float:left; background:#444">8</div><div style="width:50%; height:14%; float:left; background:#444">9</div><div style="width:50%; height:14%; float:left; background:#444">10</div><div style="width:50%; height:14%; float:left; background:#444">11</div><div style="width:50%; height:14%; float:left; background:#444">12</div><div style="width:50%; height:14%; float:left; background:#444">13</div><div style="width:50%; height:14%; float:left; background:#444">14</div></body></html>`

// const myName = 'Rico'
//
// function createTable () {
//   return (<tr>Rico</tr>)
// }
//
// const cars = ['haha', 'haha', 'haha', 'haha', 'haha']
// let i
// let text
// for (i = 0; i < cars.length; i++) {
//   text += cars[i] + '<br>'
// }

// const html = `
// <html>
//  ${text}
// </html>
//
// </table>
// `

const cars = ['ggwp', 'glhf', 'lol', 'rotfl', 'haha', 'game', 'rico', 'i want to try', 'haha', 'yes', 'zzz', 'gagaga', 'haha']

export default class Print extends Component {
  async createPDF () {
    let i
    let text = ''
    for (i = 0; i < cars.length; i++) {
      text += `<div style="height:14%; width:50%;float:left;background: #DDD">` + cars[i] + `</div>`
    }

    const html = `<html style="height:100%;padding:0;margin:0;"><body style="height:100%;padding:0;margin: 0;"><div style="width:50%; height:14%; float:left; background: #DDD"></div><div style="width:50%; height:14%; float:left; background: #777">2</div><div style="width:50%; height:14%; float:left; background:#AAA">3</div><div style="width:50%; height:14%; float:left; background:#444">4</div><div style="width:50%; height:14%; float:left; background:#444">5</div><div style="width:50%; height:14%; float:left; background:#444">6</div><div style="width:50%; height:14%; float:left; background:#444">7</div><div style="width:50%; height:14%; float:left; background:#444">8</div><div style="width:50%; height:14%; float:left; background:#444">9</div><div style="width:50%; height:14%; float:left; background:#444">10</div><div style="width:50%; height:14%; float:left; background:#444">11</div><div style="width:50%; height:14%; float:left; background:#444">12</div><div style="width:50%; height:14%; float:left; background:#444">13</div><div style="width:50%; height:14%; float:left; background:#444">14</div></body></html>`

    const html2 = `
<html style="height:100%;padding:0;margin:0;">
  <body style="height:100%;padding:0;margin: 0;">
    ${text}
  </body>
</html>`

    console.log("html", html)

    console.log("html2", html2)
    let options = {
      html: html2,
      fileName: 'test',
      directory: 'docs'
    }

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath)
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
