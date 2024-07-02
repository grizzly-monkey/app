import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { farmDenormalizeSchema } from "./Schema";
import { normalizeData } from "@/types/normalize";
import FarmModel from "./models/FarmModel";

export default class FarmSelectors {
  static SelectFarmList = (state: RootState): normalizeData =>
    state?.farms?.farms;

  static SelectDenormalizeFarm = createSelector(
    (state) => state?.farms?.farms,
    (normalizedFarms) => farmDenormalizeSchema(normalizedFarms)
  );

  static SelectSelectedFarm = (state: RootState) => state?.farms?.selectedFarm;
  static SelectActiveFarmOptions = createSelector(
    this.SelectDenormalizeFarm,
    (farms: FarmModel[]) => {
      let farmList: any = [];

      if (farms.length > 0 && farms[0]) {
        farmList = farms.map((farm: FarmModel) => {
          return {
            label: farm.name,
            key: farm.farmId,
          };
        });
      }

      return farmList;
    }
  );

  static SelectSelectedFarmId = (state: RootState) =>
    state.farms?.selectedFarmId;

  static SelectFarmByFarmId = (state: RootState, farmId: string) =>
    state.farms?.farms?.entities?.farms?.[farmId];
}
