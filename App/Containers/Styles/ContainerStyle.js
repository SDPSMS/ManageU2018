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
    color: Colors.primaryTextColour,
    fontSize: 20
  },
  sectionText: {
    color: Colors.primaryTextColour,
    padding: Metrics.baseMargin,
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 50
  },
  subtitleText: {
    color: Colors.primaryTextColour,
    fontWeight: 'bold'
  },
  
    formStyle: {
    margin: 40
  }
})
