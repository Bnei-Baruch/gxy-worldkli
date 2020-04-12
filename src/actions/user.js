import { createAction } from 'redux-actions';
import { api } from '../utils/data';

export const fillBB = createAction('FILL_BB');

export const getBB = (groupIdx) => async (dispatch, getState) => {
  const disableBI = !!!groupIdx;

  if (!groupIdx && !Number.isInteger(groupIdx)) groupIdx = getState().user.selectedGroupIdx;

  const res = await api({
    type: 'getBB',
    data: {
      timestamp: (Number.isInteger(groupIdx) && groupIdx > -1 && groupIdx !== getState().user.selectedGroupIdx) ? 0 : getState().user.timestamp,
      selectedGroup: Number.isInteger(groupIdx) && groupIdx > -1 && getState().user.groups[groupIdx]
    },
    disableBI
  });

  dispatch(fillBB(res));

}
