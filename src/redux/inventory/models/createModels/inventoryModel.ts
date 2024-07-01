import { BaseModel } from "sjs-base-model";

export class InventoryModel extends BaseModel {
  productId = null;
  description = null;
  provider = null;
  quantity = null;

  constructor(data: Partial<InventoryModel>) {
    super();
    this.update(data);
  }
}
