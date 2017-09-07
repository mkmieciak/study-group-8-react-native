import React, { PureComponent, PropTypes } from 'react';
import { Animated, Easing } from 'react-native';
import { range } from 'ramda';
import SlidesNavigationIndicator from './SlidesNavigationIndicator';
import { Colors } from '../Themes';

import styles from './Styles/SlidesNavigationStyles';

export default class SlidesNavigation extends PureComponent {

  static propTypes = {
    itemsCount: PropTypes.number.isRequired,
    position: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Animated.View pointerEvents="none" style={styles.container}>
      {range(0, this.props.itemsCount).map(
        (index) => {
          const activeColor = this.props.position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [Colors.aquaTransparent, Colors.aqua, Colors.aquaTransparent],
          });

          return <SlidesNavigationIndicator key={index} color={activeColor} />;
        }
      )}
      </Animated.View>
    );
  }
}
