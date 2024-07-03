import { BaseModel } from "sjs-base-model";

export class InventoryModel extends BaseModel {
  productId = null;
  description = null;
  provider = null;
  quantity = null;
  farmId = "fm1a215ac2";

  constructor(data: Partial<InventoryModel>) {
    super();
    this.update(data);
  }
}
