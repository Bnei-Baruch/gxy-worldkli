import React, { Component } from 'react';
import Globe from 'components/Globe';

export default class Login extends Component {
  render() {
    const bbS = {
      fontFamily: 'Noto Sans JP', 
      fontSize: 22,
      color: 'white'
    }
    const wcvS = {
      fontFamily: 'Noto Sans JP', 
      fontWeight: 700,
      color: 'white',
      fontSize: 23.2
    }
    const sepS = {
      height: 1,
      background: 'white'
    }
    return (
      <div style={{...this.props.style, display: 'flex', alignItems: 'center'}}>
        <Globe style={{height: 100}} />
        <div style={{marginLeft: 10}}>
          <div style={bbS}>BNEI BARUCH GALAXY</div>
          <div style={sepS}></div>
          <div style={wcvS}>WORLD KLI VIEWER</div>
        </div>
      </div>
    );
  }
}
