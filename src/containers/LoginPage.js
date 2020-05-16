import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as NotificationActions from '../actions/notification';
import * as AuthActions from '../actions/auth';
import userManager from "utils/userManager";

class App extends Component {

  componentDidMount() {
    userManager.signinSilent().then(user=>{
      console.log('user', user)
      if (!!user) userManager.signinRedirect();
    })
  }

  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    // let pageS = {
    //   height: '100%'
    // }
    // const theme = createMuiTheme({
    //   typography: {
    //     useNextVariants: true,
    //   }
    // });

    return (
      <div>
       <button onClick={this.onLoginButtonClick}>login</button>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  notification: state.notification
}), wrapActionCreators({ ...NotificationActions, ...AuthActions }))(App));