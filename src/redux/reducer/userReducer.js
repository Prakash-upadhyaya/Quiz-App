import {ACTION_TYPE} from "../../constants/constants";

const initialState = {
  current_user: {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        current_user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
