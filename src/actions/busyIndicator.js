import { createAction } from 'redux-actions';

export const incrementBusyIndicator = createAction('INCREMENT_BUSY_INDICATOR_COUNTER');
export const decrementBusyIndicator = createAction('DECREMENT_BUSY_INDICATOR_COUNTER');
export const progressBusyIndicator = createAction('PROGRESS_BUSY_INDICATOR');
