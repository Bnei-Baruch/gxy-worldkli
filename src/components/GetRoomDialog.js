import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as NotificationActions from '../actions/notification';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { api } from 'utils/data';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core';

const searchStyles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    position: 'absolute',
    top:17,
    right:20
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class SearchCmp extends Component {

  render() {
    const {classes} = this.props;
    return <Paper className={classes.root} elevation={1}>
      <InputBase onChange={e => this.props.onChange(e.target.value)} className={classes.input} placeholder="Search..." />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  }
}

const Search = withStyles(searchStyles)(SearchCmp);

class GetRoomDialog extends Component {

  state = { rooms: [] }

  async componentDidMount() {
    const res = await api({
      type: 'getRooms'
    });
    this.setState({ rooms: res.rooms.sort() });
  }

  render() {

    return (
      <Dialog
        open={true}
        maxWidth="md"
        fullWidth={true}
        onClose={() => this.props.close(false)}
        aria-labelledby="alert-dialog-title"
        style={{minWidth: 300}}
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Select a Room<Search onChange={search => this.setState({search})} /></DialogTitle>
        <DialogContent>
          <div>
            {
              this.state.rooms.filter(room => !this.state.search ? true : room.roomName.toLowerCase().includes(this.state.search.toLowerCase())).map(room => <div key={room.roomName} style={{ margin: 5, display: 'inline-block' }}>
                <Button onClick={() => { this.props.onSelect(room.roomName); this.props.close() }} variant="outlined" color="primary">{`${room.roomName} (${room.sum})`}</Button>
              </div>)
            }
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default connect(state => ({}), wrapActionCreators(NotificationActions))(GetRoomDialog);
