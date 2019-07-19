import { HANDLE_SEARCH } from '../actionTypes'

const globalState = {
  querySearch: ''
}

// Reducer
const globalReducer = (state = globalState, action) => {
  if (action.type === HANDLE_SEARCH) {
    return {
      ...state,
      querySearch: action.payload
    }
  }
  return state
}

export default globalReducer