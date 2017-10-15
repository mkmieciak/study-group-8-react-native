import { NativeModules } from 'react-native';
import { select } from 'redux-saga/effects'

import { selectActive } from '../Selectors/FlashlightSelectors'

export function * switchFlashlight () {
  const active = yield select(selectActive)

  NativeModules.Flashlight.switchState(active);
}
