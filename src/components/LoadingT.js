import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    const pageS = {
      height: '100vh', 
      padding: 20,
      fontFamily: 'arial', 
      fontSize: 14,
      color: '#14447c'
    }
    return (
      <div style={pageS}>
        LOADING...
      </div>
    );
  }
}
