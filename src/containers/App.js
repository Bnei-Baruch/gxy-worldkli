import React, { Component } from 'react';
import BusyIndicator from '../components/BusyIndicator';
import { connect } from 'react-redux';
import NotificationDialog from '../components/NotificationDialog';
import wrapActionCreators from '../utils/wrapActionCreators';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as NotificationActions from '../actions/notification';
import BBTabs from 'components/BBTabs';

class App extends Component {

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
          <BBTabs />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  notification: state.notification
}), wrapActionCreators({ ...NotificationActions }))(App));