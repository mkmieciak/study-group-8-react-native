import { createSelector } from 'reselect'
import { prop } from 'ramda'

const selectFlashlight = prop('flashlight')

export const selectActive = createSelector(
  selectFlashlight,
  prop('active')
)
