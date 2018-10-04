import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    width: 340,
    height: 45,
    borderRadius: 50,
    marginHorizontal: Metrics.section,
    marginVertical: 3,
    backgroundColor: Colors.defaultPrimaryColour,
    justifyContent: 'center'

  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
