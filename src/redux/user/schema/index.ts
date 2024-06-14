import { normalizeData } from "@/types/normalize";
import { denormalize, normalize, schema } from "normalizr";

const user = new schema.Entity("user", {}, { idAttribute: "userId" });

const userListSchema = [user];

const userNormalizeSchema = (data: normalizeData) => normalize(data, userListSchema);

export const userDenormalizeSchema = (data: normalizeData) => {
  if (!data) return null;
  const { result, entities } = data;
  if (result && entities) return denormalize(result, userListSchema, entities);
  return [];
};

export const addNormalizeUser =(data :normalizeData, newUser:any)=>{
    const { result, entities } = data
    if (result && entities) return {
        result: [...result, newUser.userId],
        entities: {users: {[newUser.userId]: newUser,...entities.users}}
    }
}

export default userNormalizeSchema;