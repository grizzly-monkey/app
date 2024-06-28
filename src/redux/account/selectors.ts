import { createSelector } from "@reduxjs/toolkit";
import {
  makeSelectErrorModel,
  makeSelectFieldErrors,
} from "../error/errorSelector";

class AccountSelectors {
  static SelectCreateUserFieldErrors = createSelector(
    makeSelectErrorModel(),
    makeSelectFieldErrors(),
    (_, fieldErrors) => fieldErrors
  );
}

export default AccountSelectors;
