/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between py-2">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright © Unidad de Educación Virtual - Unisinú Virtual Montería {new Date().getFullYear()}
          </span>
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            <a href="https://www.unisinu.edu.co/" target="_blank" rel="noopener noreferrer">
              Universidad del Sinú
            </a>
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer
