import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "utils/userManager";
import { withRouter } from 'react-router';

class CallbackPage extends React.Component {

  render() {
    // just redirect to '/' in both cases
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() => {
          console.log('success')
          this.props.history.push("/m")
        }}
        errorCallback={error => {
          this.props.history.push("/");
          console.error('callback error', error);
        }}
        >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }
}

export default withRouter(connect()(CallbackPage));
