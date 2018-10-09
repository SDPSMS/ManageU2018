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

  seminarText: {
    color: Colors.primaryTextColour,
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 40
  },

  titleText: {
    color: Colors.primaryTextColour,
    fontWeight: 'bold',
    fontSize: 20
  },

  sectionText: {
    color: Colors.primaryTextColour,
    padding: Metrics.baseMargin,
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 50,
    paddingBottom: 35,
    fontSize: 50
  },

  loginText: {
    color: Colors.primaryTextColour,
    padding: Metrics.baseMargin,
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 100,
    paddingBottom: 30,
    fontSize: 55
  },

  subtitleText1: {
    color: Colors.primaryTextColour,
    fontWeight: 'bold',
    padding: Metrics.baseMargin,
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 15
  },
  subtitleText2: {
    color: Colors.primaryTextColour,
    color: 'red'
  },

  formStyle: {
    margin: 40
  },

  registerLinkText: {
    color: 'blue',
    fontSize: 20,
    alignItems: 'center',
    alignSelf: 'center'
  }
})
