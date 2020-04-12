import { handleActions } from 'redux-actions';
import { showNotification, hideNotification, _playAlert, stopAlert  } from '../actions/notification';

const initialState = {
  title: '', 
  text: '',
  html: '', 
  show: false,
  onClose: null,
  addNo: false,
  playAlert: false
};

export default handleActions({
  [showNotification]: (state, action) => {    
    return {
      title: action.payload.title, 
      text: action.payload.text, 
      html: action.payload.html, 
      show: true,
      onClose: action.payload.onClose,
      addNo: action.payload.addNo
    };
  },
  [hideNotification]: (state, action) => {
    return initialState;
  },
  [_playAlert]: (state, action) => {
    return {...state, playAlert: true}
  },
  [stopAlert]: (state, action) => {
    return {...state, playAlert: false}
  },
}, initialState);