import { normalizeData } from "@/types/normalize";
import { denormalize, normalize, schema } from "normalizr";
import FarmModel from "../models/FarmModel";

const farmList = new schema.Entity("farms", {}, { idAttribute: "farmId" });
const farmListSchema = [farmList];

export const farmNormalizeSchema = (data: normalizeData) =>
  normalize(data, farmListSchema);


export const addFarmNormalizedSchema = (data: any, newEntry: FarmModel) => {
  if(!data) return normalize([newEntry], farmListSchema)
  const { result, entities } = data
  if (result && entities)
    return {
      result: [newEntry.farmId, ...result],
      entities: { farms: { [newEntry.farmId]: newEntry, ...entities.farms } },
    }
  return data
}

export const farmDenormalizeSchema = (data: normalizeData) => {
  if (!data) return null;

  const { result, entities } = data;
  if (result && entities) return denormalize(result, farmListSchema, entities);
  return [];
};
