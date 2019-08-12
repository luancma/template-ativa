/* eslint-disable no-nested-ternary */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import { isIOS, isMobile } from 'react-device-detect';
import TopNav from 'components/TopNav';
import asyncComponent from '../util/asyncComponent';
import Tour from '../components/Tour/index';

class App extends React.Component {
  render() {
    const {
      match,
      drawerType,
      navigationStyle,
      horizontalNavPosition,
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? 'fixed-drawer'
      : drawerType.includes(COLLAPSED_DRAWER)
        ? 'collapsible-drawer'
        : 'mini-drawer';

    // set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height');
    } else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height');
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        <Tour />

        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${
              navigationStyle === HORIZONTAL_NAVIGATION
                ? 'app-header-horizontal'
                : ''
            }`}
          >
            {navigationStyle === HORIZONTAL_NAVIGATION
              && horizontalNavPosition === ABOVE_THE_HEADER && (
                <TopNav styleName="app-top-header" />
            )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION
              && horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <Route
                  path={`${match.url}/sample-page`}
                  component={asyncComponent(() => import('./pages/CustomerPage'))}
                />
                <Route
                  path={`${match.url}/create-user`}
                  component={asyncComponent(() => import('./pages/CreateUSer'))}
                />
                <Route
                  path={`${match.url}/create-customer`}
                  component={asyncComponent(() => import('./pages/CreateCustomer'))}
                />
                <Route
                  path={`${match.url}/contracts-list`}
                  component={asyncComponent(() => import('./pages/ContractsList'))}
                />
                <Route
                  path={`${match.url}/create-contract`}
                  component={asyncComponent(() => import('./pages/CreateContract'))}
                />
                <Route
                  path={`${match.url}/edit-customer`}
                  component={asyncComponent(() => import('./pages/EditCustomer/index'))}
                />
                <Route
                  path={`${match.url}/create-outsourced`}
                  component={asyncComponent(() => import('./pages/Outsourceds/CreateOutsource'))}
                />
                <Route
                  path={`${match.url}/edit-outsourced`}
                  component={asyncComponent(() => import('./pages/Outsourceds/EditOutsourced'))}
                />
                <Route
                  path={`${match.url}/outsourceds`}
                  component={asyncComponent(() => import('./pages/Outsourceds/index'))}
                />
                <Route
                  component={asyncComponent(() => import('components/Error404'))}
                />
              </Switch>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition };
};
export default withRouter(connect(mapStateToProps)(App));
