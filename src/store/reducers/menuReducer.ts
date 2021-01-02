
import { combineReducers } from 'redux'
import { PERSONAL_FEATURES } from '../actionTypes';

interface ActionProps {
  type: string,
  isOpen?: Boolean,
}

export const menuReducer = (state = { isOpen: false }, action: ActionProps) => {
  switch (action.type) {
    case PERSONAL_FEATURES:
      return {
        ...state,
        isOpen: action.isOpen,
      }
    default:
      return state
  }
}

export default combineReducers({
  menuReducer,
})