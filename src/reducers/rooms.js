import { handleActions } from 'redux-actions';
import { addRoom } from '../actions/rooms';

const initialState = {
  rooms: [],
  selectedRoom: false
};

export default handleActions({
  [addRoom]: (state, action) => ({ rooms: state.rooms.concat(action.payload), selectedRoom: action.payload }),
}, initialState);