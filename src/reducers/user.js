import { handleActions } from 'redux-actions';
import { _updateBB, overrideBB, setGender, _addRoom } from '../actions/user';

const initialState = {
  timestamp: 0,
  selectedTabIdx: -1,
  usersInTab: [],
  tabs: [],
  gender: 'm'
};

export default handleActions({
  [setGender]: (state, action) => ({...state, gender: action.payload}), 
  [overrideBB]: (state, action) => ({...state, ...action.payload}), 
  [_addRoom]: (state, action) => ({...state, tabs: state.tabs.concat({type: 'room', label: action.payload})}), 
  [_updateBB]: (state, action) => {
    const payload = action.payload;

    const addedUsers = payload.usersInTab.filter(u => !!u.status);
    const removedUserIds = payload.usersInTab.filter(u => !u.status).map(u => u.userId);

    const usersInTab = state.usersInTab.filter(u => !removedUserIds.includes(u.userId)).concat(addedUsers);
    return {
      ...state,
      timestamp: payload.timestamp,
      selectedTabIdx: payload.selectedTabIdx,
      usersInTab,
      tabs: payload.tabs
    };

  },
}, initialState);