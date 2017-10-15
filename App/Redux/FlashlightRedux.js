import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  switch: []
}, { prefix: 'FLASHLIGHT_' })

export const FlashlightTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  active: false
})

export const switchHandler = state => state
  .set('active', !state.active)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SWITCH]: switchHandler,
})
