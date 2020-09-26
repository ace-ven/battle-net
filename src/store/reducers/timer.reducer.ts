import { TIMER_ACTION } from "../types.d";

export default (state = {}, action: any) => {
  switch (action.type) {
    case TIMER_ACTION.TIME_START:
      return { ...state, start: action.start };
    case TIMER_ACTION.TIME_END:
      return { ...state, start: action.payload };
    default:
      return { ...state };
  }
};
