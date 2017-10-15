import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { ifElse, always, propEq, identity } from 'ramda'
import { Colors } from '../Themes'

import styles from './Styles/MenuItem'

export default class MenuItem extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    onPress: identity,
    disabled: false
  }

  handlePress = () => ifElse(
    propEq('disabled', false),
    props => props.onPress(),
    identity
  )(this.props)

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.iconWrapper, {
            backgroundColor: this.props.color,
            opacity: ifElse(propEq('disabled', true), always(0.2), always(1))(this.props)
          }]}
          onPress={this.handlePress}>
          <Icon
            style={styles.icon}
            name={this.props.icon}
            size={50}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
