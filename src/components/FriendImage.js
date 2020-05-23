import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    transition: 'opacity 4s',
  }
});

class FriendImage extends Component {

  state = { display: false , opacity: 0}

  componentDidMount() {
    setTimeout(()=>this.setState({display: true}), this.props.loadTimer);
    setTimeout(()=>this.setState({opacity: 1}), this.props.loadTimer+600);
  }

  render() {
    return (
      this.state.display && <div
        onMouseEnter={this.props.onMouseEnter}
        className={this.props.classes.root}
        style={{
          opacity: this.state.opacity,
          width: this.props.imageWidth,
          height: this.props.imageHeight,
          backgroundImage: `url(${this.props.image.replace('.jpg', `${this.props.imageSufix}.jpg`)})`,
          backgroundSize: 'cover',
          backgroundColor: 'black',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'inline-block',
          position: 'relative'
        }}>
      </div>
    );
  }
}
export default withStyles(styles)(FriendImage)