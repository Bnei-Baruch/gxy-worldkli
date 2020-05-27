import { createAction } from 'redux-actions';
import { api } from '../utils/data';
import { shuffle } from '../utils/utils';

export const overrideBB = createAction('CLEAR_ANDFILL_BB');
export const _updateBB = createAction('UPDATEL_BB');
export const setGender = createAction('SET_GENDER');
export const _addRoom = createAction('ADD_ROOM');

export const shuffleBB = () => (dispatch, getState) => {
  dispatch(overrideBB({ ...getState().user, usersInTab: shuffle(getState().user.usersInTab) }));
}

let shuffleInterval, updateInterval, timer, busy = false, busyTimer;

document.addEventListener('mousemove', () => {
  busy = true;
  busyTimer && clearTimeout(busyTimer);
  busyTimer = setTimeout(() => busy = false, (1000 * 15));
})

const clearTimers = () => {
  shuffleInterval && clearInterval(shuffleInterval);
  timer && clearTimeout(timer);
  updateInterval && clearInterval(updateInterval);
}

const setTimers = (dispatch) => {
  clearTimers();
  timer = setTimeout(() => {
    shuffleInterval = setInterval(() => !busy && dispatch(shuffleBB()), (1000 * 10));
  }, (1000 * 20))

  updateInterval = setInterval(() => dispatch(updateBB()), (1000 * 60 * 10));
}

export const updateBB = () => async (dispatch, getState) => {
  const { timestamp, selectedTabIdx, gender } = getState().user;
  const res = await api({
    type: 'getBB',
    data: {
      tab: getState().user.tabs[selectedTabIdx],
      rooms: getState().user.tabs.filter(room => room.type === 'room'),
      gender,
      timestamp,
      type: 'update'
    }
  });
  dispatch(_updateBB(res));
}


export const setBB = (tabIdx) => async (dispatch, getState) => {
  clearTimers();

  const res = await api({
    type: 'getBB',
    data: {
      tab: tabIdx && getState().user.tabs[tabIdx],
      rooms: getState().user.tabs.filter(room => room.type === 'room'),
      gender: getState().user.gender,
      type: 'set'
    }
  });
  dispatch(overrideBB(res));
  setTimers(dispatch);
}

export const addRoom = roomName => async (dispatch, getState) => {
  let selectedTabIdx = false;
  getState().user.tabs.forEach((tab, idx) => tab.label === roomName && (selectedTabIdx = idx));
  if (!selectedTabIdx) {
    selectedTabIdx = getState().user.tabs.length;
    dispatch(_addRoom(roomName));
  }
  dispatch(setBB(selectedTabIdx));
}
