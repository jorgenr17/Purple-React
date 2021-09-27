import { LOGIN } from './types'

export const setAuth = (value, data) => (dispatch /*getState*/) => {
  let token = ''
  if (value) {
    token = 'jlnr.adssada.12acads'
    const sessionData = { ...data, token }
    localStorage.setItem('@SESSION_DATA', JSON.stringify(sessionData))
  } else {
    localStorage.removeItem('@SESSION_DATA')
  }
  dispatch({
    type: LOGIN,
    payload: { token, isAuth: value }
  })
}
