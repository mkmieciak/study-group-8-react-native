import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  initialize: [],
  initializeSuccess: ['isActive'],
  setIsActive: ['isActive']
}, { prefix: 'FLASHLIGHT_' })

export const FlashlightTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  isActive: false,
  isSupported: false,
})

export const initializeSuccessHandler = (state, { isActive }) => state
  .set('isActive', isActive)
  .set('isSupported', true)

export const setIsActiveHandler = (state, { isActive }) => state
  .set('isActive', isActive)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE_SUCCESS]: initializeSuccessHandler,
  [Types.SET_IS_ACTIVE]: setIsActiveHandler,
})
