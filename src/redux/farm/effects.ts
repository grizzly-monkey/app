import api from "@/utilities/api";
import { delToModel, getToModel, postToModel, putToModel } from "@/utilities/effectUtility";
import FarmModel from "./models/FarmModel";
import PolyhouseModel from "./models/PoluhouseModel";


export default class FarmsEffects {
  static getFarms() {
    return getToModel(FarmModel, api.FARMS);
  }

  static addFarm(payload: FarmModel) {
    return postToModel(FarmModel, api.FARMS, payload)
  }

  static updateFarm(farmId: string, payload:FarmModel) {
    return putToModel(FarmModel, api.FARM.replace(':farmId', farmId), payload)
  }

  static deleteFarm(farmId: string) {
    console.log("farmId", farmId)
    return delToModel(FarmModel, api.FARM.replace(':farmId', farmId))
  }

  static addPolyhouseToFarm(farmId:string,payload:PolyhouseModel) {
    return postToModel(PolyhouseModel, api.POLYHOUSE.replace(':farmId', farmId), payload)
  }

}
