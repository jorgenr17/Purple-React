import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './App.scss'
import { withTranslation } from 'react-i18next'
import { Provider } from 'react-redux'
import store from './store'
import Auth from './auth'

class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged()
  }
  render() {
    return (
      <Provider store={store}>
        <Auth />
      </Provider>
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  onRouteChanged() {
    // console.log('ROUTE CHANGED')
    const { i18n } = this.props
    const body = document.querySelector('body')
    if (this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl')
      i18n.changeLanguage('ar')
    } else {
      body.classList.remove('rtl')
      i18n.changeLanguage('en')
    }
    window.scrollTo(0, 0)
    const fullPageLayoutRoutes = [
      '/user-pages/login-1',
      '/user-pages/register-1',
      '/user-pages/lockscreen',
      '/error-pages/error-404',
      '/error-pages/error-500',
      '/general-pages/landing-page'
    ]
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        const el = document.querySelector('.page-body-wrapper')
        el && el.classList.add('full-page-wrapper')
        break
      } else {
        this.setState({
          isFullPageLayout: false
        })
        const el = document.querySelector('.page-body-wrapper')
        el && el.classList.remove('full-page-wrapper')
      }
    }
  }
}

export default withTranslation()(withRouter(App))
