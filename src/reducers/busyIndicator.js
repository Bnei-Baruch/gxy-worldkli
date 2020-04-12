import { handleActions } from 'redux-actions';
import { incrementBusyIndicator, decrementBusyIndicator, progressBusyIndicator } from '../actions/busyIndicator';

const initialState = {
  progress: 0, 
  step: 0
};

export default handleActions({
  [incrementBusyIndicator]: state => ({...state, step: state.step+1}),
  [decrementBusyIndicator]: state => {
    const step = state.step-1;
    const progress = step<0 ? 0 : state.progress;
    return {step, progress};
  },
  [progressBusyIndicator]: (state, action) => {
    console.log('progress busy indicator', action)
    return {...state, progress: parseInt(action.payload)};
  },
}, initialState);