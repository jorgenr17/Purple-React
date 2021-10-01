import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { setAuth } from '../actions'
import { connect } from 'react-redux'
import { useQuery } from '../../utils/customHooks'
import { useHistory } from 'react-router'
import { GET, POST } from '../../utils/http'

export function Login({ SETAUTH }) {
  const history = useHistory()
  const query = useQuery()
  const defaultCode = query.get('code') || ''
  const [code] = useState(defaultCode)
  // const [user, setUser] = useState({ username: '', password: '' })

  // console.log(query.get('code'))

  const getToken = async () => {
    POST({
      url: '/login/oauth2/token',
      baseURL: 'http://localhost:4000/json_placeholder',
      data: {
        grant_type: 'authorization_code',
        client_id: '142460000000000142',
        client_secret: '9mnIkNNwuFgrMBD3DvBbwOnzi8WNjNdmaabbPw5auREwZl8bjczHZLBJEn5p5djN',
        redirect_uri: 'http://localhost:3000/main/dashboard',
        code
      }
    })
      .then(response => {
        const { user, access_token, ...rest } = response.data
        getUserProfile({ user, token: access_token, rest })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getUserProfile = async sessionData => {
    GET({
      baseURL: 'http://localhost:4000/json_placeholder',
      url: `/api/v1/users/${sessionData.user.id}/profile`,
      headers: { Authorization: `Bearer ${sessionData.token}` }
    })
      .then(response => {
        console.log(response.data)
        const profileData = response.data
        sessionData = { ...sessionData, profile: profileData }
        SETAUTH(sessionData)
        history.replace({ pathname: '/main' })
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (code) {
      getToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center auth px-0" style={{ height: '100vh' }}>
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require('../../assets/images/logo.svg')} alt="logo" />
              </div>
              <h4>Hola, iniciemos!</h4>
              {code ? (
                <h6 className="font-weight-light">Espere un momento mientras se valida su sesión...</h6>
              ) : (
                <>
                  <h6 className="font-weight-light my-4">
                    Para iniciar sesión por favor haga click en el siguiente botón
                  </h6>
                  <Button
                    href="https://unisinu.beta.instructure.com/login/oauth2/auth?client_id=142460000000000142&response_type=code&redirect_uri=http://localhost:3000/tutoapp/login"
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    INICIAR SESIÓN
                  </Button>
                </>
              )}
              {/* <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="text"
                    placeholder="Usuario de CANVAS"
                    size="lg"
                    className="h-auto"
                    onChange={event => setUser({ ...user, username: event.target.value })}
                    value={user.username}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña de CANVAS"
                    size="lg"
                    className="h-auto"
                    onChange={event => setUser({ ...user, password: event.target.value })}
                    value={user.password}
                  />
                </Form.Group>
                <div className="mt-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={event => {
                      event.preventDefault()
                    }}
                  >
                    INICIAR SESIÓN
                  </Button>
                </div>
              </Form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  SETAUTH: user => dispatch(setAuth(true, user))
})

export default connect(null, mapDispatchToProps)(Login)

// export default Login
