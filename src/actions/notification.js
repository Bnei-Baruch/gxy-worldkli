import { createAction } from 'redux-actions';

export const showNotification = createAction('SHOW_NOTIFICATION');
export const hideNotification = createAction('HIDE_NOTIFICATION');
export const _playAlert = createAction('PLAY_ALERT');
export const stopAlert = createAction('STOP_ALERT');

export function playAlert() {
  return (dispatch, getState) => {

    const _play = () => {
      let unreadAlerts = 0;
      getState().cameras.items.forEach(c => unreadAlerts += c.unreadAlertsSum);
      // const resellerWatchMode = !!getState().resellerSharedSites.cameras.length;
      // const cameras = getState().resellerSharedSites.camera;
      // (unreadAlerts || resellerWatchMode) && 
      
      dispatch(_playAlert());
    }

    _play();

    if (getState().login.user.snooze) {
      setTimeout(()=>{getState().login.user.snooze && _play()}, 15000);
      setTimeout(()=>{getState().login.user.snooze && _play()}, 30000);
      setTimeout(()=>{getState().login.user.snooze && _play()}, 45000);
      setTimeout(()=>{getState().login.user.snooze && _play()}, 60000);
      setTimeout(()=>{getState().login.user.snooze && _play()}, 75000);
      setTimeout(()=>{getState().login.user.snooze && _play()}, 90000);
    }
  }
}

export function askNotification(cb, text) {
  return dispatch => {
    dispatch(showNotification({
      text: text || 'Are You Sure?',
      addNo: true,
      onClose: res => {
        res && cb(res);
      }
    }));
  };
}
