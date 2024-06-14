import { getToModel, postToModel } from "@/utilities/effectUtility";
import UserModel from "./models/getModels/userModel";
import api from "@/utilities/api";

class UserEffects {
    static getUsers() {
       return getToModel(UserModel,api.USERS)
    }

    static createUser(data: any) {
        return postToModel(UserModel, api.USERS, data);
    }
}

export default UserEffects;