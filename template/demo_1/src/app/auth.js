import React from 'react'
import Login from './user-pages/Login'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Main from './general-pages/Main-page'
import Error404 from './error-pages/Error404'

function Auth(props) {
  return (
    <Switch>
      <Route exact path="/login">
        {/* <Login /> */}
        {props.isAuth ? <Redirect to={{ pathname: '/main' }} /> : <Login />}
      </Route>
      <Route path="/main">
        {/* <Main /> */}
        {props.isAuth ? <Main /> : <Redirect to={{ pathname: '/login' }} />}
      </Route>
      <Route exact path="/">
        <Redirect to={{ pathname: props.isAuth ? '/main/dashboard' : '/login' }} />
      </Route>
      <Route path="*">
        <Error404 />
      </Route>
    </Switch>
  )
}

const mapStateToProps = state => {
  return { isAuth: state.auth.isAuth }
}

export default withRouter(connect(mapStateToProps)(Auth))
