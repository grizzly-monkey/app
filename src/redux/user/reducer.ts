import BaseReducer from "@/utilities/baseReducer";
import UserActions from "./actions";
import userNormalizeSchema, { addNormalizeUser } from "./schema";

const initialState = {

  entities: [
    {
      userID: 1,
      firstName: 'John',
      lastName: 'Doe',
      roles: ['Admin', 'User'],
      contactNumber: '1234567890',
    },
    {
      userID: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'two@gamil.com',
      roles: ['User'],
      contactNumber: '0987654321',
    },
    {
      userID: 3,
      firstName: 'John',
      lastName: 'Smith',
      email: 'thre@gmail.com',
      roles: ['Admin'],
      contactNumber: '1234567890',
    }
  ]

}

export default BaseReducer(initialState, {
  [UserActions.FETCH_USERS](state, action) {
    return {
      ...state,
      // users: userNormalizeSchema(action.payload),

    };
  },
  [UserActions.CREATE_USER](state, action) {
    return {
      ...state,
      users: addNormalizeUser(state.users, action.payload)
    };
  },
  [UserActions.SELECT_USER](state, action) {
    return {
      ...state,
      selectedUser: action.payload
    };
  },
  [UserActions.UNSELECT_USER](state) {
    return {
      ...state,
      selectedUser: null
    };
  }
});