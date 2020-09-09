import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import _w from 'utils/wrapActionCreators';
// import * as BIActions from 'actions/busyIndicator'
import { rnd } from 'utils/utils';

const fTStyle = {
  root: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'arial',
    textAlign: 'center',
    fontSize: 45,
    transition: 'font-size 2s, opacity 2s',
    width: '80vw',
    height: '25vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    textShadow: '7px 6px 4px #000',
    fontWeight: 'bold'
  }
}

class _FT extends Component {
  state = {
    left: (rnd() % 100) - 40 + '%',
    top: (rnd() % 100) - 25 + '%'
  }

  componentDidMount() {
    setTimeout(() => this.setState({ fontSize: 70, opacity: 1 }), 200);
    setTimeout(() => this.setState({ fontSize: 10, opacity: 0 }), 2700);
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root} style={{ opacity: this.state.opacity, fontSize: this.state.fontSize, position: 'absolute', top: this.state.top, left: this.state.left, color: 'white' }}>
      <div>
        <div>{this.props.room}</div>
      </div>
    </div>
  }
}

const FT = withStyles(fTStyle)(_FT);


const floatingTitlesStyle = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 9999
  }
}

class FloatingTitles extends Component {

  state = {friends: []}

  componentDidMount(){
    setInterval(()=>{
      if (!this.props.users.length) return false;
      let _friends = this.state.friends.concat();
      if (_friends.length > 400) _friends=[];
      var user = this.props.users[Math.floor(Math.random() * this.props.users.length)];
      const friends = _friends.concat({name: user.userName, room: user.roomName});
      this.setState({friends})
    }, 500)
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.wrapper}>
      {
        this.state.friends.map((f, idx) => <FT key={idx+f.name+f.room} name={f.name} room={f.room} />)
      }
    </div>
  }
}

export default connect(state => ({
  users: state.user.usersInTab
}))(withStyles(floatingTitlesStyle)(FloatingTitles));