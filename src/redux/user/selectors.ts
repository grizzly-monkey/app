import { userDenormalizeSchema } from "./schema";

class UserSelectors{
    public static selectUsers(state: any){
        return userDenormalizeSchema(state?.users?.users);
    }

    public static selectSelectedUser(state: any){
        return state.users.selectedUser;
    }
}

export default UserSelectors;