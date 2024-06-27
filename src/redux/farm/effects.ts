import api from "@/utilities/api";
import { getToModel, postToModel } from "@/utilities/effectUtility";
import FarmModel from "./models/FarmModel";
import PolyhouseModel from "./models/PoluhouseModel";


export default class FarmsEffects {
  static getFarms() {
    return getToModel(FarmModel, api.FARMS);
  }
  static addFarm(payload) {
    return postToModel(FarmModel, api.FARMS, payload)
  }
  static addPolyhouseToFarm(farmId,payload) {
    return postToModel(PolyhouseModel, api.POLYHOUSE.replace(':farmId', farmId), payload)
  }
}
