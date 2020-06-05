import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

export default class Balloon extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = { top: 0, left: 0, hide: false, neverShow: localStorage.getItem(`never-show-ballon-${this.props.id}`)==='true' };

  componentDidMount() {
    if (!this.state.neverShow){
      console.log(this.myRef.current.offsetParent);
      const { bottom, right } = this.myRef.current.offsetParent.getBoundingClientRect();
      this.setState({ display: true, left: right - 40 - (this.props.width || 200), top: bottom + 10 })
    }
  }

  dontShow = () => {
    localStorage.setItem(`never-show-ballon-${this.props.id}`, 'true');
    this.setState({hide: true});
  }

  render() {
    return (<>
      {
        !this.state.neverShow && !this.state.hide && <div ref={this.myRef} style={{
          position: this.state.display && 'fixed',
          zIndex: 9999,
          background: 'white',
          borderRadius: 5,
          left: this.state.left,
          top: this.state.top,
          padding: '45px 15px 15px 15px',
          boxShadow: '0 0 20px 5px #222',
          textAlign: 'center',
          ...this.props.style
        }}>
          <IconButton style={{ position: 'absolute', left: 0, top: 0 }} color="inherit" onClick={()=>this.setState({hide: true})} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <div style={{
            fontFamily: 'arial',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 12
          }}>
            {this.props.children}
          </div>

          <Button color="primary" onClick={()=>this.dontShow()}>
            Dont show again
          </Button>
          <div style={{
            position: 'absolute',
            right: 12,
            top: -20,
            zIndex: 9999,
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderBottom: '20px solid white',
          }}>
          </div>
        </div >
      }
    </>
    );
  }
}
