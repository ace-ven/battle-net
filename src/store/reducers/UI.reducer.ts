import { UI_ACTIONS } from "./../types.d";
export default (state: any = [], action: any) => {
  switch (action.type) {
    case UI_ACTIONS.DARK_MODE:
      return { ...state, darkMode: action.payload };
    case UI_ACTIONS.DARK_MODE_OFF:
      return { ...state, darkMode: false };
    case UI_ACTIONS.SHOW_LOADER:
      return { ...state, showLoader: true };
    case UI_ACTIONS.HIDE_LOADER:
      return { ...state, showLoader: false };
    case UI_ACTIONS.ADD_TOASTER_ALERT: {
      const massages =
        state.messages && state.messages.length > 0 ? [...state.messages] : [];
      return { ...state, messages: [...massages, action.payload] };
    }
    case UI_ACTIONS.REMOVE_TOASTER_ALERT: {
      if (!action.payload) {
        const newMsg = [...state.messages];
        newMsg.shift();
        return { ...state, messages: [...newMsg] };
      }
      let newMsg = [...state.messages];
      newMsg.splice(action.payload, 1);
      return { ...state, messages: [...newMsg] };
    }

    case UI_ACTIONS.SHOW_LOGIN:
      return { ...state, showLoginModal: action.payload };
    default:
      return { ...state };
  }
};
