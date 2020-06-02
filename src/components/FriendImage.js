import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import _w from 'utils/wrapActionCreators';
import * as BIActions from 'actions/busyIndicator'

const styles = () => ({
  root: {
    transition: 'opacity 4s',
  }
});

class FriendImage extends Component {

  state = { display: false, opacity: 0 }

  componentDidMount() {
    this.props.increaceBusyIndicatorTotalProgress();
    setTimeout(() => {
      var img = new Image();
      img.onload = () => {
        console.log(this.props.image)
        this.props.increaceBusyIndicatorProgress();
        this.setState({ display: true });
        setTimeout(() => this.setState({ opacity: 1 }), 600);
      }
      img.src = this.props.image;
    }, this.props.loadTimer);
  }

  render() {
    return (this.state.display && <div
        onMouseEnter={this.props.onMouseEnter}
        className={this.props.classes.root}
        style={{
          opacity: this.state.opacity,
          width: this.props.imageWidth,
          height: this.props.imageHeight,
          backgroundImage: `url(${this.props.image})`,
          backgroundSize: 'cover',
          backgroundColor: 'black',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'inline-block',
          position: 'relative'
        }}>
      </div>)
  }
}
export default connect(state => ({
  user: state.user
}), _w({ ...BIActions }))(withStyles(styles)(FriendImage));