import React, { Component } from 'react';
import BBLogo from 'components/BBLogo';

export default class Globe extends Component {
  render() {
    const size = (this.props.style && this.props.style.height) || 100;
    const wrapperS = {
      width: size, 
      height: size, 
      overflow: 'hidden', 
      borderRadius: size/2,
      position: 'relative'
    }
    const globeS = {
      position: 'absolute',
      top: size * (-96/300),
      height: size * (488/300),
      left: size * (-287/300)
    }
    const bbLogoS = {
      position: 'absolute', 
      opacity: 0.7,
      height: size*0.9,
      top: size*0.05,
      left: size*0.235
    }
    return (
      <div style={wrapperS}>
        <video style={globeS} autoPlay loop muted>
          <source src='./globe.mov' />
        </video>
        <BBLogo style={bbLogoS} />
      </div>
    );
  }
}
