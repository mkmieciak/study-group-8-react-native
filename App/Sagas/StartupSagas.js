import { put } from 'redux-saga/effects'
import GeolocationActions from '../Redux/GeolocationRedux'
import CompassActions from '../Redux/CompassRedux'
import FlashlightActions from '../Redux/FlashlightRedux'

export function * startup () {
  try {
    yield put(GeolocationActions.getCurrentPosition())
    yield put(GeolocationActions.startWatchingPosition())
    yield put(CompassActions.initialize())
    yield put(FlashlightActions.initialize())
  } catch (error) {
    console.log(error);
  }
}
