import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Spinner from '../app/shared/Spinner'

const Dashboard = lazy(() => import('./dashboard/Dashboard'))
const Tutorias = lazy(() => import('./tutoria/Tutoria'))
const Consejerias = lazy(() => import('./consejeria/Consejeria'))

// administrar recursos
const Campus = lazy(() => import('./admin-resources/Campus'))
const Schools = lazy(() => import('./admin-resources/Facultades'))
const Programs = lazy(() => import('./admin-resources/Programas'))
const Areas = lazy(() => import('./admin-resources/Areas'))
const Asignaturas = lazy(() => import('./admin-resources/Asignaturas'))
const Settings = lazy(() => import('./settings/Settings'))

const Buttons = lazy(() => import('./basic-ui/Buttons'))
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'))
const Typography = lazy(() => import('./basic-ui/Typography'))

const BasicElements = lazy(() => import('./form-elements/BasicElements'))

const BasicTable = lazy(() => import('./tables/BasicTable'))

const Mdi = lazy(() => import('./icons/Mdi'))

const ChartJs = lazy(() => import('./charts/ChartJs'))

const Error404 = lazy(() => import('./error-pages/Error404'))
const Error500 = lazy(() => import('./error-pages/Error500'))

const Login = lazy(() => import('./user-pages/Login'))
const Register1 = lazy(() => import('./user-pages/Register'))
const Lockscreen = lazy(() => import('./user-pages/Lockscreen'))

const BlankPage = lazy(() => import('./general-pages/BlankPage'))

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/main/">
            <Redirect to="/main/dashboard" />
          </Route>
          <Route exact path="/main/dashboard" component={Dashboard} />
          <Route exact path="/main/tutorias" component={Tutorias} />
          <Route exact path="/main/consejerias" component={Consejerias} />
          <Route exact path="/main/admin-resources/campus" component={Campus} />
          <Route exact path="/main/admin-resources/schools" component={Schools} />
          <Route exact path="/main/admin-resources/programs" component={Programs} />
          <Route exact path="/main/admin-resources/areas" component={Areas} />
          <Route exact path="/main/admin-resources/courses" component={Asignaturas} />
          <Route exact path="/main/settings" component={Settings} />
          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />
          <Route path="/form-Elements/basic-elements" component={BasicElements} />
          <Route path="/main/tables/basic-table" component={BasicTable} />
          <Route path="/icons/mdi" component={Mdi} />
          <Route path="/charts/chart-js" component={ChartJs} />
          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />
          <Route path="/user-pages/lockscreen" component={Lockscreen} />
          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />
          <Route path="/general-pages/blank-page" component={BlankPage} />
          {/* <Redirect to="/dashboard" /> */}
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
