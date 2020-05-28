import { handleActions } from 'redux-actions';
import { incrementBusyIndicator, decrementBusyIndicator, progressBusyIndicator, increaceBusyIndicatorProgress, increaceBusyIndicatorTotalProgress } from '../actions/busyIndicator';

const initialState = {
  progress: 0, 
  step: 0,
  totalNeededProgress: 0,
  totalProgress: 0
};

export default handleActions({
  [incrementBusyIndicator]: state => ({...state, step: state.step+1}),
  [decrementBusyIndicator]: state => {
    const step = state.step-1;
    const progress = step<0 ? 0 : state.progress;
    return {...state, step, progress};
  },
  [progressBusyIndicator]: (state, action) => {
    console.log('progress busy indicator', action)
    return {...state, progress: parseInt(action.payload)};
  },
  [increaceBusyIndicatorTotalProgress]: (state, action) => {
    return {...state, totalNeededProgress: state.totalNeededProgress+1, progress: `${parseInt(((state.totalProgress+1) / state.totalNeededProgress)*100)}%`}
  },
  [increaceBusyIndicatorProgress]: (state, action) => {
    if (state.totalProgress+1 === state.totalNeededProgress) return initialState;
    return {...state, totalProgress: state.totalProgress+1, progress: `${parseInt(((state.totalProgress+1) / state.totalNeededProgress)*100)}%`}
  }
}, initialState);