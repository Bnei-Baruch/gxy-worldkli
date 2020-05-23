import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as NotificationActions from '../actions/notification';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { api } from 'utils/data';

class GetRoomDialog extends Component {

  state = { rooms: [] }

  async componentDidMount() {
    const res = await api({
      type: 'getRooms'
    });
    this.setState({ ...res });
  }

  render() {

    return (
      <Dialog
        open={true}
        maxWidth="md"
        onClose={() => this.props.close(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Select a Room</DialogTitle>
        <DialogContent>
          <div>
            {
              this.state.rooms.map(room => <div key={room.roomName} style={{ margin: 5, display: 'inline-block' }}>
                <Button onClick={()=>{this.props.onSelect(room.roomName); this.props.close()}} variant="outlined" color="primary">{`${room.roomName} (${room.sum})`}</Button>
              </div>)
            }
          </div>
          </DialogContent>
      </Dialog>
    );
  }
}

export default connect(state => ({}), wrapActionCreators(NotificationActions))(GetRoomDialog);
