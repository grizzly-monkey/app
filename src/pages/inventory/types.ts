export interface Inventory {
    inventoryId: string;
    productId: string;
    name: string;
    farmId: string;
    description: string;
    provider: string;
    quantity: number;
    unit: string;
    used: number;
    wastage: number;
    createdBy: string;
    updatedBy: string;
    createdDate: string;
    updatedDate: string;
}