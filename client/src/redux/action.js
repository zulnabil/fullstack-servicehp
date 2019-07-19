import { HANDLE_SEARCH } from './actionTypes'

export const listQuery = (state) => {
  return {
    query: state.querySearch
  }
}

export const changeQuery = (dispatch) => ({
    queryChange: (value) => dispatch({
      type: HANDLE_SEARCH,
      payload: value
    })
})