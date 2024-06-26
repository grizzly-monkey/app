import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { farmDenormalizeSchema } from "./Schema";
import { normalizeData } from "@/types/normalize";

export default class FarmSelectors {
  static SelectFarmList = (state: RootState): normalizeData =>
    state?.farms?.farms;

  static SelectDenormalizeFarm = createSelector(
    (state) => state?.farms?.farms,
    (normalizedFarms) => farmDenormalizeSchema(normalizedFarms)
  );
}
