import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { cwRed } from '../config/colors';


class Header extends Component {
  render() {
    let busyIndicatorS = {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'rgba(0,0,0,0.01)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999999999999
    }
    return (

      this.props.busyIndicator.step !== 0 && <div style={busyIndicatorS}>
        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color='#2e88c8'
          loading={true}
        />
        {
          !!this.props.busyIndicator.progress && <div style={{ position: 'absolute', fontSize: 40, textAlign: 'center', color: cwRed }}>
            {this.props.busyIndicator.progress}
          </div>
        }
      </div>
    );
  }
}

export default connect(state => ({
  busyIndicator: state.busyIndicator
}))(Header);
