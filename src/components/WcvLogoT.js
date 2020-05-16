import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    const bbS = {
      fontFamily: 'Noto Sans JP', 
      fontSize: 16,
      color: '#42c6d2'
    }
    const wcvS = {
      fontFamily: 'Noto Sans JP', 
      fontWeight: 700,
      fontSize: 16,
      color: '#14447c'
    }
    return (
      <div style={{...this.props.style, display: 'flex', alignItems: 'center'}}>
        <img src='./logoT.png' style={{height: 120}} alt="logo"/>
        <div style={{marginLeft: -5}}>
          <div style={bbS}>OUT CONNECTION</div>
          <div style={wcvS}>NETWORK</div>
        </div>
      </div>
    );
  }
}
