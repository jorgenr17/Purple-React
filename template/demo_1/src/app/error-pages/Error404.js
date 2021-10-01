import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Error404 extends Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
          <div className="row flex-grow">
            <div className="col-lg-8 mx-auto text-white">
              <div className="row align-items-center d-flex flex-row">
                <div className="col-lg-6 text-lg-right pr-lg-4">
                  <h1 className="display-1 mb-0">404</h1>
                </div>
                <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                  <h2>UPS!</h2>
                  <h3 className="font-weight-light">La pagina a la que usted intenta acceder no existe.</h3>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 text-center mt-xl-2">
                  <Link className="text-white font-weight-medium" to="/main/dashboard">
                    Regresar al al inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Error404
