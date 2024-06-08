import { BaseModel } from "sjs-base-model";

export default class TodosList extends BaseModel {
  userId = null;

  id = null;

  title = null;

  completed = null;

  constructor(data: Partial<TodosList>) {
    super();
    this.update(data);
  }
}
