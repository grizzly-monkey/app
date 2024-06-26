import { API_BASE, API_VER } from "@/config/config";

export default {
  USERS: `${API_BASE}/${API_VER}/users`,
  REGISTER: `${API_BASE}/${API_VER}/auth/register`,

  FARMS:`${API_BASE}/${API_VER}/farms`,

  ORGANIZATIONS: `${API_BASE}/${API_VER}/organisations`,
};
