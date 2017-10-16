import React, { PureComponent } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import morse from 'morse';
import { equals, prop, complement, cond, isNil } from 'ramda'
import { createStructuredSelector } from 'reselect'
import RoundedButton from '../Components/RoundedButton';
import { Colors } from '../Themes'

import FlashlightActions from '../Redux/FlashlightRedux'

import styles from './Styles/Morse'

const DOT_LENGTH = 500;

class Compass extends PureComponent {
  state = {
    text: '',
    encodedText: '',
  }

  flashTimeout = null;
  processTimeout = null;

  componentDidMount = () => this.textInput.focus();

  componentWillUnmount() {
    this.props.setIsFlashlightActive(false);
    this.clearTimeouts();
  }

  clearTimeouts = () => {
    cond([
      [(context) => complement(isNil(prop('flashTimeout')(context))), () => clearTimeout(this.flashTimeout)],
      [(context) => complement(isNil(prop('processTimeout')(context))), () => clearTimeout(this.processTimeout)],
    ])(this);
  };

  handleTextSubmit = () => {
    this.clearTimeouts();
    this.setState({ encodedText: morse.encode(this.state.text).replace(/\.\.\.\.\.\.\./, 'n') }, this.processText);
  };

  processText = (offset = 0) => {
    const sign = this.state.encodedText.charAt(offset);
    cond([
      [equals('.'), () => {
        this.props.setIsFlashlightActive(true);
        this.flashTimeout = setTimeout(() => this.props.setIsFlashlightActive(false), DOT_LENGTH);
        this.processTimeout = setTimeout(() => this.processText(++offset), 2 * DOT_LENGTH);
      }],
      [equals('-'), () => {
        this.props.setIsFlashlightActive(true);
        this.flashTimeout = setTimeout(() => this.props.setIsFlashlightActive(false), 3 * DOT_LENGTH);
        this.processTimeout = setTimeout(() => this.processText(++offset), 4 * DOT_LENGTH);
      }],
      [equals(' '), () => {
        this.processTimeout = setTimeout(() => this.processText(++offset), DOT_LENGTH);
      }],
      [equals('n'), () => {
        this.processTimeout = setTimeout(() => this.processText(++offset), 7 * DOT_LENGTH);
      }],
    ])(sign);
  };

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          ref={(ref) => (this.textInput = ref)}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.submitButton} onPress={this.handleTextSubmit}>
          <Text style={styles.submitButtonText}>Start</Text>
        </TouchableOpacity>
        <RoundedButton
          icon='arrow-back'
          color={Colors.white}
          styles={styles.backButton}
          size={50}
          iconSize={25}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setIsFlashlightActive: FlashlightActions.setIsActive,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Compass)
