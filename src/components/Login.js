import React, { Component } from 'react';
import WcvLogo from 'components/WcvLogo';
import Button from '@material-ui/core/Button';

export default class Login extends Component {
  render() {
    const pageS = {
      height: '100vh',
      background: '#474040'
    }
    const btnS = {
      left: 'calc(50vw - 50px)',
      top: 'calc(50vh - 21px)',
      backgroundColor: '#009eff',
      position: 'absolute'
    }
    return (
      <div style={pageS}>
        <WcvLogo style={{ padding: 20 }} />
        <div>
          <Button onClick={e=>this.props.onLoginClick(e)} style={btnS} variant="contained" size="large" color="primary">
            LOGIN
          </Button>
        </div>
      </div>
    );
  }
}
