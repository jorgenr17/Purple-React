import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { setAuth } from '../actions'

class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active')
  }

  render() {
    return (
      <nav
        className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
        style={{ backgroundColor: '#4C5660' }}
      >
        <div
          className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
          style={{ backgroundColor: '#4C5660' }}
        >
          <Link className="navbar-brand brand-logo" to="/">
            <img src={require('../../assets/images/logo.svg')} alt="logo" />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src={require('../../assets/images/logo-mini.svg')} alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle('sidebar-icon-only')}
          >
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-logout d-none d-lg-block">
              <a
                className="nav-link"
                href="!#"
                onClick={evt => {
                  evt.preventDefault()
                  this.props.logout(false)
                }}
              >
                <i className="mdi mdi-power"></i>
              </a>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: value => dispatch(setAuth(value))
})

export default connect(null, mapDispatchToProps)(Navbar)
