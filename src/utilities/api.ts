import { API_BASE, API_VER } from "@/config/config";

export default {
  TODOS: `https://jsonplaceholder.typicode.com/todos`,

  USERS:`${API_BASE}/${API_VER}/users`,
  REGISTER: `${API_BASE}/${API_VER}/auth/register`,
};
