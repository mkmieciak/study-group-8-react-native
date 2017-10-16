import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.mainContainer,
    padding: 30,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: Colors.aqua,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
  backButton: {
    backgroundColor: Colors.aqua,
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 1
  },
})
