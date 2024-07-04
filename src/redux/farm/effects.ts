import api from "@/utilities/api";
import { getToModel, postToModel } from "@/utilities/effectUtility";
import FarmModel from "./models/FarmModel";


export default class FarmsEffects {
  static getFarms() {
    return getToModel(FarmModel, api.FARMS);
  }
  static addFarm(payload) {
    return postToModel(FarmModel, api.FARMS, payload)
  }
}
