import { LOGIN } from './types'

export const setAuth = (value, data) => (dispatch /*getState*/) => {
  const sessionData = { ...data }
  if (value) {
    console.log(sessionData, 'aa')
    localStorage.setItem('@SESSION_DATA', JSON.stringify(sessionData))
  } else {
    localStorage.removeItem('@SESSION_DATA')
  }
  dispatch({
    type: LOGIN,
    payload: { user: sessionData.user, token: sessionData.token, isAuth: value }
  })
}
