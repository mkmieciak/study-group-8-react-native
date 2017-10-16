import { NativeModules } from 'react-native';
import { select, put } from 'redux-saga/effects'

import { selectIsActive } from '../Selectors/FlashlightSelectors'
import FlashlightActions from '../Redux/FlashlightRedux'


export function * initialize () {
  const status = yield new Promise((resolve) => NativeModules.Flashlight.checkState(resolve));
  if (status !== 'notSupported') {
    yield put(FlashlightActions.initializeSuccess(status === 'on'));
  }
}


export function * setIsFlashlightActive ({ isActive }) {
  NativeModules.Flashlight.switchState(isActive);
}
