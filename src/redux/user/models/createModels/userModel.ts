import { BaseModel } from "sjs-base-model";

export default class UserModel extends BaseModel {

  firstName = null;

  lastName = null;

  email = null;

  address = null;

  password = null;

  phone = null;

  roles = null;

  organisation = null;

  constructor(data: Partial<UserModel>) {
    super();
    this.update(data);
  }
}