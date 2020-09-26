import { TIMER_ACTION } from "../types.d";

export const startTimer = () => ({
  type: TIMER_ACTION.TIME_START,
  start: true
});

export const timerEnds = () => ({
  type: TIMER_ACTION.TIME_END,
  payload: false
});
