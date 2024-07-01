import { API_BASE, API_VER } from "@/config/config";

export default {
  USERS: `${API_BASE}/${API_VER}/users`,
  REGISTER: `${API_BASE}/${API_VER}/auth/register`,

  FARMS:`${API_BASE}/${API_VER}/farms`,
  FARM:`${API_BASE}/${API_VER}/farms/:farmId`,
  POLYHOUSE: `${API_BASE}/${API_VER}/farms/:farmId/polyhouses`,

  ORGANIZATIONS: `${API_BASE}/${API_VER}/organisations`,
};
