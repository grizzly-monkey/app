import { BaseModel } from "sjs-base-model";

export default class UserModel extends BaseModel {

  firstName = null;

  lastName = null;

  phone = null;

  roles = null;

  constructor(data: Partial<UserModel>) {
    super();
    this.update(data);
  }
}