import { createMockStore } from "./testUtils";

export const setupDefaultStore = (initialState: Record<string, any> = {}) => {
  return createMockStore({
    session: {},
    requesting: {},
    error: {},
    organizations: {
      organisations: [],
      selectedOrganisation: null,
    },
    ...initialState,
  });
};
