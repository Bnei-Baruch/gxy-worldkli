import { createAction } from 'redux-actions';
import { api } from '../utils/data';

export const fillBB = createAction('FILL_BB');

export const getBB = (groupIdx, gender='m') => async (dispatch, getState) => {
  const disableBI = !!!groupIdx;

  if (!groupIdx && !Number.isInteger(groupIdx)) groupIdx = getState().user.selectedGroupIdx;

  let timestamp = (Number.isInteger(groupIdx) && groupIdx > -1 && groupIdx !== getState().user.selectedGroupIdx) ? 0 : getState().user.timestamp;
  
  if (groupIdx === 'clear') {
    groupIdx=false;
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

}
