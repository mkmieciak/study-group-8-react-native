import React, { PureComponent } from 'react'
import { ScrollView, View } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ifElse, propEq, always, when } from 'ramda'

import { selectIsActive, selectIsSupported as selectIsFlashlightSupported } from '../Selectors/FlashlightSelectors'
import { selectIsSupported as selectIsCompassSupported } from '../Selectors/CompassSelectors'
import FlashlightActions from '../Redux/FlashlightRedux'
import MenuItem from '../Components/MenuItem'
import { Colors } from '../Themes'
import styles from './Styles/Menu'

class Menu extends PureComponent {
  get flashlightIcon() {
    return ifElse(
      propEq('isFlashlightActive', true),
      always('lightbulb-on-outline'),
      always('lightbulb-outline')
    )(this.props)
  }

  get flashlightIconColor() {
    return ifElse(propEq('isFlashlightActive', true), always(Colors.aqua), always(Colors.yellow))(this.props)
  }

  render () {
    const { isFlashlightActive, isFlashlightSupported, isCompassSupported } = this.props;

    return (
      <ScrollView style={styles.list}>
        <View style={styles.container}>
          <MenuItem
            icon={this.flashlightIcon}
            color={this.flashlightIconColor}
            disabled={!isFlashlightSupported}
            onPress={() => this.props.setIsFlashlightActive(!this.props.isFlashlightActive)}
          />
          <MenuItem
            icon='compass'
            color={Colors.orange}
            disabled={!isCompassSupported}
            onPress={() => this.props.navigate('Compass')}
          />
          <MenuItem icon='map-marker' color={Colors.brown} />
          <MenuItem
            icon='camera'
            color={Colors.aqua}
            onPress={() => this.props.navigate('Camera')}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isFlashlightActive: selectIsActive,
  isFlashlightSupported: selectIsFlashlightSupported,
  isCompassSupported: selectIsCompassSupported
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setIsFlashlightActive: FlashlightActions.setIsActive,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
