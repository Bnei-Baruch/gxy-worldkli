import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    const pageS = {
      height: '100vh', 
      background: '#474040',
      padding: 20,
      fontFamily: 'arial', 
      fontSize: 14,
      color: 'white'
    }
    return (
      <div style={pageS}>
        LOADING...
      </div>
    );
  }
}
