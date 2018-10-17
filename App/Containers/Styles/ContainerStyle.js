import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background,
  },
  containerHelp:{
      padding: Metrics.baseMargin,
      backgroundColor: Colors.background,
      marginBottom: 50
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
    fontSize: 22,
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 3
  },
  
  explainText: {
    color: '#555660',
    fontSize: 15
  },

  sectionText: {
    color: Colors.primaryTextColour,
    padding: Metrics.baseMargin,
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 25,
    fontSize: 45
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
    color: Colors.fire,
    textAlign: 'center'
  },

  formStyle: {
    margin: 40
  },

  registerLinkText: {
    color: 'blue',
    fontSize: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  
  semDetailsText: {
    color: Colors.primaryTextColour,
    fontWeight: 'bold',
    fontSize: 35,
    justifyContent: 'center', 
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10
  },

  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
