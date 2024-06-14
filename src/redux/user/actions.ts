import { createAction } from "@/utilities/actionUtility"

const UserActions = {
    FETCH_USERS: 'FETCH_USERS',
    FETCH_USERS_FINISHED: 'FETCH_USERS_FINISHED',
    CREATE_USER : 'CREATE_USER',
    CREATE_USER_FINISHED: 'CREATE_USER_FINISHED',
    SELECT_USER: 'SELECT_USER',
    SELECT_USER_FINISHED: 'SELECT_USER_FINISHED',
    UNSELECT_USER: 'UNSELECT_USER',
    UNSELECT_USER_FINISHED: 'UNSELECT_USER_FINISHED',

    fetchUsers() {
        return createAction(this.FETCH_USERS);
    },

    createUser(payload: any) {
        return createAction(this.CREATE_USER, payload);
    },

    selectUser(payload: any) {
        return createAction(this.SELECT_USER, payload);
    },

    unSelectUser() {
        return createAction(this.UNSELECT_USER);
    }
}

export default UserActions;