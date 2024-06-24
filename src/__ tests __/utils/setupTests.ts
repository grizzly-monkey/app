import { createMockStore } from "./testUtils";

export const setupDefaultStore = () => {
  return createMockStore({
    session: {},
    requesting: {},
    error: {},
  });
};
