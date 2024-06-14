class UserSelectors{
    public static selectUsers(state: any){
        return state.users.entities;
    }

    public static selectSelectedUser(state: any){
        return state.users.selectedUser;
    }
}

export default UserSelectors;