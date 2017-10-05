import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GeolocationTypes } from '../Redux/GeolocationRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { watchPosition, getCurrentPosition } from './GeolocationSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(GeolocationTypes.WATCH_POSITION, watchPosition),
    takeLatest(GeolocationTypes.GET_CURRENT_POSITION, getCurrentPosition)
  ])
}
