import React, { Component } from 'react';
import BusyIndicator from '../components/BusyIndicator';
import { connect } from 'react-redux';
import NotificationDialog from '../components/NotificationDialog';
import wrapActionCreators from '../utils/wrapActionCreators';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as NotificationActions from '../actions/notification';
import * as AuthActions from '../actions/auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import BBTabs from 'components/BBTabs';
import LoginPage from 'containers/LoginPage';
import CallbackPage from 'containers/CallbackPage';
import FloatingTitles from 'components/FloatingTitles';

class App extends Component {

  state = {
    showFloating: false
  }

  componentDidMount() {
    document.onkeypress = e => {
      if (e.code === 'KeyB') {
        this.setState({showFloating: !this.state.showFloating});
      }
    }
  }

  routeAuthenticate = Component => {
    return !this.props.user || this.props.user.expired ? <LoginPage /> : <Component />
  }

  render() {
    let appS = {
      height: '100%'
    }
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    return (
      <div style={appS}>
        <MuiThemeProvider theme={theme}>
          <BusyIndicator />
          <NotificationDialog />
          {
            this.state.showFloating && <FloatingTitles />
          }
          <Switch>
            <Route path="/callback" render={() => <CallbackPage />} />
            <Route exact path="/login" render={() => this.routeAuthenticate(LoginPage)} />
            <Route exact path="/:gender" render={() => this.routeAuthenticate(BBTabs)} />
            <Redirect exact from='/' to='/login' />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  notification: state.notification,
  user: state.oidc.user
}), wrapActionCreators({ ...NotificationActions, ...AuthActions }))(App));