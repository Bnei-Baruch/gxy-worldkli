import { createAction } from 'redux-actions';

export const incrementBusyIndicator = createAction('INCREMENT_BUSY_INDICATOR_COUNTER');
export const decrementBusyIndicator = createAction('DECREMENT_BUSY_INDICATOR_COUNTER');
export const progressBusyIndicator = createAction('PROGRESS_BUSY_INDICATOR');
export const increaceBusyIndicatorTotalProgress = createAction('INCREASE_BUSSY_INDICATOR_TOTAL_PROGRESS');
export const increaceBusyIndicatorProgress = createAction('INCREASE_BUSSY_INDICATOR_PROGRESS');
