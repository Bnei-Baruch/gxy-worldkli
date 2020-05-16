import React, { Component } from 'react';
import WcvLogo from 'components/WcvLogo';

export default class Empty extends Component {
  render() {
    const pageS = {
      height: '100vh',
      background: '#474040'
    }
    const btnS = {
      paddingTop: '24vh',
      color: 'white',
      textAlign: 'center',
      fontSize: 24,
      fontFamily: 'Noto Sans JP'
    }
    return (
      <div style={pageS}>
        <WcvLogo style={{ padding: 20 }} />
        <div style={btnS}>
          NO USERS WERE FOUND<br/>
          auto refresh in 10 min.
        </div>
      </div>
    );
  }
}
