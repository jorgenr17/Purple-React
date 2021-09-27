import { LOGIN } from '../actions/types'

const initialState = {
  token: JSON.parse(localStorage.getItem('@SESSION_DATA'))?.token,
  isAuth: JSON.parse(localStorage.getItem('@SESSION_DATA')) !== null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const { token, isAuth } = action.payload
      return { token, isAuth }
    default:
      return state
  }
}
