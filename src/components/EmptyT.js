import React, { Component } from 'react';
import WcvLogoT from 'components/WcvLogoT';

export default class Empty extends Component {
  render() {
    const pageS = {
      height: '100vh',
    }
    const btnS = {
      paddingTop: '24vh',
      color: '#14447c',
      textAlign: 'center',
      fontSize: 24,
      fontFamily: 'Noto Sans JP'
    }
    return (
      <div style={pageS}>
        <WcvLogoT style={{ padding: 20 }} />
        <div style={btnS}>
          auto refresh in 10 min.
        </div>
      </div>
    );
  }
}
