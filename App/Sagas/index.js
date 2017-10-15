import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { PlacesTypes } from '../Redux/PlacesRedux'
import { MapTypes } from '../Redux/MapRedux'
import { GeolocationTypes } from '../Redux/GeolocationRedux'
import { CompassTypes } from '../Redux/CompassRedux'
import { CameraTypes } from '../Redux/CameraRedux'
import { FlashlightTypes } from '../Redux/FlashlightRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { request as placesRequest } from './PlacesSagas'
import { changeRegion } from './MapSagas'
import { startWatchingPosition, getCurrentPosition } from './GeolocationSagas'
import { initialize, startWatchingDirection } from './CompassSagas'
import { imageSearchRequest } from './CameraSagas'
import { switchFlashlight } from './FlashlightSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PlacesTypes.REQUEST, placesRequest),
    takeLatest(MapTypes.CHANGE_REGION, changeRegion),
    takeLatest(GeolocationTypes.GET_CURRENT_POSITION, getCurrentPosition),
    takeLatest(GeolocationTypes.START_WATCHING_POSITION, startWatchingPosition),
<<<<<<< HEAD
    takeLatest(CompassTypes.INITIALIZE, initialize),
    takeLatest(CompassTypes.START_WATCHING_DIRECTION, startWatchingDirection),
    takeLatest(CameraTypes.IMAGE_SEARCH_REQUEST, imageSearchRequest)
=======
    takeLatest(CameraTypes.IMAGE_SEARCH_REQUEST, imageSearchRequest),
    takeLatest(FlashlightTypes.SWITCH, switchFlashlight),
>>>>>>> Sync flashlight state with camera flash unit
  ])
}
