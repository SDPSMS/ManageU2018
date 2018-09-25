import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  // TODO: Static width and height?
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.silver,
    padding: Metrics.baseMargin
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center'

  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,

  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    fontWeight: 'bold',
  },
  textInput:{
    width: 100,
    alignItems: 'flex-start',
    alignSelf: "flex-start",
  }
})
