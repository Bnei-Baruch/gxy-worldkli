import { handleActions } from 'redux-actions';
import { fillBB } from '../actions/user';

const initialState = {
  timestamp: 0,
  selectedGroup: '',
  selectedGroupIdx: -1,
  usersInGroup: [],
  groups: []
};

export default handleActions({
  [fillBB]: (state, action) => {
    const payload = action.payload;

    const addedUsers = payload.usersInGroup.filter(u => !!u.status);
    const removedUserIds = payload.usersInGroup.filter(u => !u.status).map(u => u.userId);

    if (state.selectedGroup !== payload.selectedGroup) {
      return {...payload, usersInGroup: addedUsers, selectedGroupIdx: payload.groups.indexOf(payload.selectedGroup)};
    }


    const usersInGroup = state.usersInGroup.filter(u => !removedUserIds.includes(u.userId)).concat(addedUsers);
    return {
      timestamp: payload.timestamp,
      selectedGroup: payload.selectedGroup,
      selectedGroupIdx: payload.groups.indexOf(payload.selectedGroup),
      usersInGroup,
      groups: payload.groups
    };
  },
}, initialState);