import { LANGUAGE_KEYS } from "@/config/consts";
import { createMockStore } from "./testUtils";

export const setupDefaultStore = (initialState: Record<string, any> = {}) => {
  return createMockStore({
    session: {
      token: null,
      accountApprovalStatus: null,
      currentLanguage: LANGUAGE_KEYS.en,
      details: {},
    },
    requesting: {},
    error: {},
    organizations: {
      organisations: [],
      selectedOrganisation: null,
    },
    farms: {
      farms: {},
      selectedFarmId: null,
    },
    ...initialState,
  });
};
