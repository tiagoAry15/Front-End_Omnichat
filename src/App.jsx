import PropTypes from 'prop-types'
import React from "react"
//import { Analytics } from '@vercel/analytics/react';
import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import { SocketProvider } from '/src/contexts/SocketContext.jsx';
import { authProtectedRoutes, publicRoutes } from "./routes"

import Authmiddleware from "./routes/route"

import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

import "./assets/scss/theme.scss"
import { initFirebaseBackend } from './helpers/firebase_helper';
import { firebaseConfig } from '../firebase_SDK';

initFirebaseBackend(firebaseConfig)



const App = props => {

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <SocketProvider>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </SocketProvider>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
