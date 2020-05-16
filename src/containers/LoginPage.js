import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import { withRouter } from 'react-router';
import * as NotificationActions from '../actions/notification';
import * as AuthActions from '../actions/auth';
import userManager from "utils/userManager";
import LoginT from 'components/LoginT';
import LoadingT from 'components/LoadingT';

class App extends Component {

  state = {
    status: 'loading'
  }

  componentDidMount() {
    userManager.signinSilent().then(user => {
      if (!!user) userManager.signinRedirect();
    }).catch(() => this.setState({ status: 'login' }));
  }

  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {
          this.state.status === 'loading' && <LoadingT />
        }
        {
          this.state.status === 'login' && <LoginT onLoginClick={this.onLoginButtonClick} />
        }
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  notification: state.notification
}), wrapActionCreators({ ...NotificationActions, ...AuthActions }))(App));