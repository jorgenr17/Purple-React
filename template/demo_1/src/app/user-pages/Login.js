import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { setAuth } from '../actions'
import { connect } from 'react-redux'

export function Login({ login }) {
  const [user, setUser] = useState({ username: '', password: '' })

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
              <h6 className="font-weight-light">Inicie sesión para continuar</h6>
              <Form className="pt-3">
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
                      login(user)
                    }}
                  >
                    INICIAR SESIÓN
                  </Button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  {/* <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div> */}
                  {/* <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">
                    Forgot password?
                  </a> */}
                </div>
                {/* <div className="mb-2">
                  <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                    <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                  </button>
                </div> */}
                {/* <div className="text-center mt-4 font-weight-light">
                  Don't have an account?{' '}
                  <Link to="/user-pages/register" className="text-primary">
                    Create
                  </Link>
                </div> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(setAuth(true, user))
})

export default connect(null, mapDispatchToProps)(Login)

// export default Login
