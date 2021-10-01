import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Sidebar from '../shared/Sidebar'
import SettingsPanel from '../shared/SettingsPanel'
import Footer from '../shared/Footer'
import AppRoutes from '../AppRoutes'

export default function Main() {
  const [state] = useState({})
  let navbarComponent = !state.isFullPageLayout ? <Navbar /> : ''
  let sidebarComponent = !state.isFullPageLayout ? <Sidebar /> : ''
  let SettingsPanelComponent = !state.isFullPageLayout ? <SettingsPanel /> : ''
  let footerComponent = !state.isFullPageLayout ? <Footer /> : ''

  return (
    <div className="container-scroller">
      {navbarComponent}
      <div className="container-fluid page-body-wrapper">
        {sidebarComponent}
        <div className="main-panel">
          <div className="content-wrapper">
            <AppRoutes />
            {SettingsPanelComponent}
          </div>
          {footerComponent}
        </div>
      </div>
    </div>
  )
}
