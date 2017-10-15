import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { View, Animated, TouchableOpacity, Easing } from 'react-native'
import { TabViewAnimated, SceneMap } from 'react-native-tab-view'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { ifElse, equals, always, not } from 'ramda'

import styles from './Styles/Main'
import { Metrics, Colors } from '../Themes'
import Map from './Map'
import Places from './Places'
import SlidesNavigation from '../Components/SlidesNavigation'
import Menu from '../Containers/Menu'
import MainActions from '../Redux/MainRedux'
import { selectTabIndex } from '../Selectors/MainSelectors'
import { selectIsSupported } from '../Selectors/CompassSelectors'

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const hiddenMenuTranslate = Metrics.screenHeight / 3;

const PLACES_TAB_KEY = 'places';
const MENU_TAB_KEY = 'menu';
const TABS = {
  routes: [
    { key: MENU_TAB_KEY },
    { key: PLACES_TAB_KEY },
  ],
}

export class Main extends PureComponent {
  state = {
    menuTranslate: new Animated.Value(0),
    tabViewPosition: new Animated.Value(0)
  }

  menuVisible = true

  renderScene = () => SceneMap({
    [MENU_TAB_KEY]: () => (
      <Menu navigate={this.props.navigation.navigate} isCompassSupported={this.props.isCompassSupported} />
    ),
    [PLACES_TAB_KEY]: Places,
  })

  toggleMenu = () => {
    Animated.timing(
      this.state.menuTranslate,
      {
        toValue: ifElse(
          equals(true),
          always(hiddenMenuTranslate),
          always(0),
        )(this.menuVisible),
        easing: Easing.ease,
        duration: 500
      }
    ).start();
    this.menuVisible = not(this.menuVisible)
  }

  handlePositionChange = ({ value }) => this.state.tabViewPosition.setValue(value)

  render () {
    const mapToggleButtonRotateZ = this.state.menuTranslate.interpolate({
      inputRange: ([0, hiddenMenuTranslate]),
      outputRange: (['0deg', '180deg']),
    });

    const indicatorsTranslateY = this.state.menuTranslate.interpolate({
      inputRange: ([0, hiddenMenuTranslate]),
      outputRange: ([0, 12]),
    });

    const navigationState = {
      index: this.props.index,
      ...TABS
    }

    return (
      <View style={styles.container}>
        <Map />

        <Animated.View
          gesturesEnabled={false}
          style={[styles.mapToggleWrapper, { transform: [{ translateY: this.state.menuTranslate }] }]}
        >
          <TouchableOpacity style={styles.mapToggleButton} onPress={this.toggleMenu}>
            <AnimatedIcon
              style={{ transform: [{ rotateZ: mapToggleButtonRotateZ }] }}
              name="expand-more"
              size={20}
              color={Colors.aqua}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.contentWrapper, { transform: [{ translateY: this.state.menuTranslate }] }]}>
          <Animated.View style={{ transform: [{ translateY: indicatorsTranslateY }] }}>
            <SlidesNavigation
              itemsCount={TABS.routes.length}
              position={this.state.tabViewPosition}
            />
          </Animated.View>

          <TabViewAnimated
            style={styles.content}
            navigationState={navigationState}
            renderScene={this.renderScene()}
            onIndexChange={this.props.changeTabIndex}
            onPositionChange={this.handlePositionChange}
          />
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  index: selectTabIndex,
  isCompassSupported: selectIsSupported,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeTabIndex: MainActions.changeTabIndex,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
