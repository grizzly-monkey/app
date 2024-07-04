import { API_BASE, API_VER } from "@/config/config";

export default {
  USERS: `${API_BASE}/${API_VER}/users`,
  REGISTER: `${API_BASE}/${API_VER}/auth/register`,

  FARMS:`${API_BASE}/${API_VER}/farms`,

  ORGANIZATIONS: `${API_BASE}/${API_VER}/organisations`,
  INVENTORIES: `${API_BASE}/${API_VER}/inventories/fm1a215ac2`,
  INVENTORIESWITHOUTFARMID: `${API_BASE}/${API_VER}/inventories`,
  SUBCATEGORIES: `${API_BASE}/${API_VER}/products/sub-category`,
  PRODUCTS: `${API_BASE}/${API_VER}/products`,
};
