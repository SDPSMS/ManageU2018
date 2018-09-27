import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  listContainer: {
    marginTop: Metrics.doubleBaseMargin,
    padding: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.dividerColour,
    borderRadius: 5
  },
  titleText: {
    color: Colors.primaryTextColour
  },
  formStyle: {
    margin: 40,
  }
})
