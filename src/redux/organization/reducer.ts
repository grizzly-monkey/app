import BaseReducer from "@/utilities/baseReducer";
import OrganizationActions from "./actions";

export const initialState = {
  organisations: [],
  selectedOrganisation: {},
};

export default BaseReducer(
  initialState,
  {
    [OrganizationActions.REQUEST_ORGANIZATION_FINISHED](state, action) {
      return { ...state, organisations: action.payload };
    },
    [OrganizationActions.SELECT_ORGANIZATION](state, action) {
      return { ...state, selectedOrganisation: action.payload.organization };
    },
  },
  false
);
