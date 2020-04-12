import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as NotificationActions from '../actions/notification';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class NotificationDialog extends Component {

  handleClose = (response) => {
    this.props.notification.onClose && this.props.notification.onClose(response);
    this.props.hideNotification(!!response);
  }

  render() {

    return (
      <Dialog
        open={this.props.notification.show}
        onClose={this.handleClose.bind(this, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        {
          this.props.notification.title &&
          <DialogTitle id="alert-dialog-title">{this.props.notification.title}</DialogTitle>
        }
        <DialogContent>
          {
            this.props.notification.text && <DialogContentText id="alert-dialog-description">
              {this.props.notification.text}
            </DialogContentText>
          }
          {
            this.props.notification.html && <div dangerouslySetInnerHTML={{__html: this.props.notification.html}}></div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this, true)} color="primary">
            {this.props.notification.addNo ? 'YES' : 'OK'}
          </Button>
          {
            this.props.notification.addNo && <Button onClick={this.handleClose.bind(this, false)} color="primary">
              NO
            </Button>
          }
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(state => ({
  notification: state.notification
}), wrapActionCreators(NotificationActions))(NotificationDialog);
