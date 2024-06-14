import { BaseModel } from "sjs-base-model";

export default class UserModel extends BaseModel {
    userId = null;

    firstName = null;

    lastName = null;

    email = null;

    address = null;

    password = null;

    phone = null;

    roles = null;

    organisationId = null;

    createdBy = null

    updatedBy = null

    createdDate = 0

    updatedDate = 0

    constructor(data: Partial<UserModel>) {
        super();
        this.update(data);
    }
}