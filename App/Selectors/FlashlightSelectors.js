import { createSelector } from 'reselect'
import { prop } from 'ramda'

const selectFlashlight = prop('flashlight')

export const selectIsActive = createSelector(
  selectFlashlight,
  prop('isActive')
)

export const selectIsSupported = createSelector(
  selectFlashlight,
  prop('isSupported')
)
