import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Routes extends Component {

  render() {
    return <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  }
}

export default withRouter(connect(state => ({ login: state.login }))(Routes));
