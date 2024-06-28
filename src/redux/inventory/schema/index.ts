import { Inventory } from "@/pages/inventory/types";
import { normalizeData } from "@/types/normalize";
import { denormalize, normalize, schema } from "normalizr";

const inventory = new schema.Entity("inventories", {}, { idAttribute: "inventoryId" });

const inventoryListSchema = [inventory];

const invertoryNormalizeSchema = (data: normalizeData) => normalize(data, inventoryListSchema);

export const inventoryDenormalizeSchema = (data: normalizeData) => {
  const { result, entities } = data;
  if (result && entities) return denormalize(result, inventoryListSchema, entities);
  return [];
};

export const addNormalizeInventory =(data :normalizeData, newInventory:Inventory)=>{
    const { result, entities } = data
    
    if (result && entities) {
      const resultArray = Array.isArray(result) ? result : [result];
      return {
        result: [newInventory.inventoryId , ...resultArray],
        entities: {inventories: {...entities.inventories,[newInventory.inventoryId]: newInventory}}
    }}

    return data
}

export default invertoryNormalizeSchema;