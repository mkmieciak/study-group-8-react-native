import React, { PureComponent } from 'react'
import { ScrollView, View } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectActive } from '../Selectors/FlashlightSelectors'
import FlashlightActions from '../Redux/FlashlightRedux'
import MenuItem from '../Components/MenuItem'
import { Colors } from '../Themes'
import styles from './Styles/Menu'

class Menu extends PureComponent {
  render () {
    const { flashlightActive } = this.props;

    return (
      <ScrollView style={styles.list}>
        <View style={styles.container}>
          <MenuItem
            icon={`lightbulb${flashlightActive ? '-on' : ''}-outline`}
            color={Colors.yellow}
            onPress={() => this.props.switchFlashlight()}
          />
          <MenuItem
            icon='compass'
            color={Colors.orange}
            disabled={!this.props.isCompassSupported}
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
  flashlightActive: selectActive
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  switchFlashlight: FlashlightActions.switch,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
