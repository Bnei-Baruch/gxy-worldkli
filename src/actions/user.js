import { createAction } from 'redux-actions';
import { api } from '../utils/data';
import { shuffle } from '../utils/utils';

export const fillBB = createAction('FILL_BB');
export const refillBB = createAction('REFILL_BB');

export const shuffleBB = () => (dispatch, getState) => {
  dispatch(refillBB({ ...getState().user, usersInGroup: shuffle(getState().user.usersInGroup) }));
}

let busy = false, busyTimer;

let shuffleInterval, timer;
document.addEventListener('mousemove', ()=>{
  busy=true;
  busyTimer && clearTimeout(busyTimer);
  busyTimer = setTimeout(()=>busy=false, (1000*15));
})

export const getBB = (groupIdx, gender = 'm') => async (dispatch, getState) => {
  const disableBI = !!!groupIdx;

  if (!groupIdx && !Number.isInteger(groupIdx)) groupIdx = getState().user.selectedGroupIdx;

  let timestamp = (Number.isInteger(groupIdx) && groupIdx > -1 && groupIdx !== getState().user.selectedGroupIdx) ? 0 : getState().user.timestamp;

  if (groupIdx === 'clear') {
    groupIdx = false;
    timestamp = 0;
  }

  const res = await api({
    type: 'getBB',
    data: {
      timestamp,
      selectedGroup: Number.isInteger(groupIdx) && groupIdx > -1 && getState().user.groups[groupIdx],
      gender
    },
    disableBI
  });

  dispatch(fillBB(res));

  shuffleInterval && clearInterval(shuffleInterval);
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    shuffleInterval = setInterval(() => !busy && dispatch(shuffleBB()), (1000 * 10));
  }, (1000 * 20))
}
