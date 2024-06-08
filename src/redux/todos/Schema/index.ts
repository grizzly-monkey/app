import { normalizeData } from "@/types/normalize";
import { denormalize, normalize, schema } from "normalizr";

const todosList = new schema.Entity("todosList", {}, { idAttribute: "id" });
const todosListSchema = [todosList];

export const todosListNormalizeSchema = (data: normalizeData) =>
  normalize(data, todosListSchema);

export const todosListDenormalizeSchema = (data: normalizeData) => {
  if (!data) return null;

  console.log("iss", data);

  const { result, entities } = data;
  if (result && entities) return denormalize(result, todosListSchema, entities);
  return [];
};
