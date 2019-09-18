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
      history,
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
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === ABOVE_THE_HEADER && (
                <TopNav styleName="app-top-header" />
              )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <div className="app-wrapper">
                <Switch>
                  <Route
                    path={`${match.url}/clientes/lista`}
                    exact
                    component={asyncComponent(() =>
                      import('./pages/CustomerPage')
                    )}
                  />
                  <Route
                    path={`${match.url}/usuarios/lista`}
                    component={asyncComponent(() => import('./pages/Users'))}
                  />
                  <Route
                    path={`${match.url}/usuarios/criar`}
                    component={asyncComponent(() =>
                      import('./pages/CreateUSer')
                    )}
                  />
                  <Route
                    path={`${match.url}/cliente/criar`}
                    component={asyncComponent(() =>
                      import('./pages/CreateCustomer')
                    )}
                  />

                  <Route
                    path={`${match.url}/cliente/detalhes/:id`}
                    exact
                    component={asyncComponent(() =>
                      import('./pages/ContractsList')
                    )}
                  />

                  <Route
                    path={`${match.url}/cliente/edit`}
                    component={asyncComponent(() =>
                      import('./pages/EditCustomer/index')
                    )}
                  />

                  <Route
                    path={`${match.url}/contrato/:id`}
                    exact
                    component={asyncComponent(() =>
                      import('./pages/ContractsList')
                    )}
                  />
                  <Route
                    path={`${match.url}/contrato/detalhes/:id`}
                    exact
                    component={asyncComponent(() =>
                      import('./pages/ContractInfo')
                    )}
                  />
                  <Route
                    path={`${match.url}/contratos/lista`}
                    component={asyncComponent(() =>
                      import('./pages/ContractsList/ContractsList')
                    )}
                  />
                  <Route
                    path={`${match.url}/contrato/criar/:id`}
                    component={asyncComponent(() =>
                      import('./pages/CreateContract')
                    )}
                  />
                  <Route
                    path={`${match.url}/terceirizada/criar`}
                    component={asyncComponent(() =>
                      import('./pages/Outsourceds/CreateOutsource')
                    )}
                  />
                  <Route
                    path={`${match.url}/terceirizada/editar`}
                    component={asyncComponent(() =>
                      import('./pages/Outsourceds/EditOutsourced')
                    )}
                  />
                  <Route
                    path={`${match.url}/terceirizadas`}
                    component={asyncComponent(() =>
                      import('./pages/Outsourceds/index')
                    )}
                  />
                  <Route
                    path={`${match.url}/unidades/lista`}
                    exact
                    component={asyncComponent(() =>
                      import('./pages/UnitsPage/AllUnitsList')
                    )}
                  />
                  <Route
                    path={`${match.url}/unidades/criar/:id`}
                    exact
                    component={asyncComponent(() =>
                      import('./pages/UnitsPage/FormUnits')
                    )}
                  />
                  <Route
                    path={`${match.url}/unidades/lista/:id`}
                    exact
                    component={asyncComponent(() =>
                      import('./pages/UnitsPage/UnitsList')
                    )}
                  />
                  <Route
                    path={`${match.url}/unidades/editar/:id`}
                    component={asyncComponent(() =>
                      import('./pages/UnitsPage/EditUnit')
                    )}
                  />
                  <Route
                    path={`${match.url}/ordem/:id/detalhes`}
                    component={asyncComponent(() =>
                      import('./dumbs/ServiceOrderDetails')
                    )}
                  />
                  <Route
                    path={`${match.url}/ordem/criar`}
                    component={asyncComponent(() =>
                      import('./pages/ServiceOrder/CreateServiceOrder')
                    )}
                  />
                  <Route
                    component={asyncComponent(() =>
                      import('components/Error404')
                    )}
                  />
                </Switch>
              </div>
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
