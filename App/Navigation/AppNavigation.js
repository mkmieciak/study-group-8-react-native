import { StackNavigator } from 'react-navigation'
import { Easing, Animated } from 'react-native'
import Main from '../Containers/Main'
import Camera from '../Containers/Camera'
import Compass from '../Containers/Compass'
import Morse from '../Containers/Morse'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Main: {
    screen: Main,
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      headerTitle: 'CAMERA'
    }
  },
  Compass: {
    screen: Compass,
    navigationOptions: {
      headerTitle: 'COMPASS'
    }
  },
  Morse: {
    screen: Morse,
    navigationOptions: {
      headerTitle: 'MORSE'
    }
  }
}, {
  initialRouteName: 'Main',
  mode: 'card',
  headerMode: 'none',
  navigationOptions: {},
  transitionConfig: () => ({
    transitionSpec: {
      duration: 500,
      easing: Easing.ease,
      timing: Animated.timing
    },
    screenInterpolator: ({ layout: { initWidth }, position, scene: { index } }) => {
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, -initWidth]
      })

      const scale = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1.2, 1, 1.2]
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0]
      })

      return { opacity, transform: [{ translateX }, { scale }] }
    }
  })
})

export default PrimaryNav
