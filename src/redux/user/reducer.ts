import BaseReducer from "@/utilities/baseReducer";
import UserActions from "./actions";
import userNormalizeSchema, { addNormalizeUser } from "./schema";

const initialState={
    users:[]
}

export default BaseReducer(initialState, {
    [UserActions.FETCH_USERS](state, action) {
      return {
        ...state,
        users: userNormalizeSchema(action.payload),
      };
    },
    [UserActions.CREATE_USER](state, action) {
      return {
        ...state,
        users: addNormalizeUser(state.users, action.payload)
      };
    },
  });