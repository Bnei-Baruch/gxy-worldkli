import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';


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

      ((this.props.busyIndicator.step !== 0) || !!this.props.busyIndicator.progress) && <div style={busyIndicatorS}>
        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color='#2e88c8'
          loading={true}
        />
        {
          !!this.props.busyIndicator.progress && <div style={{ fontFamily: 'arial', position: 'absolute', fontSize: 28, opacity: 0.5, textAlign: 'center', color: 'white'}}>
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
