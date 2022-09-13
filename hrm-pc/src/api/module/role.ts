import type { RoleType } from "@/types/role";
import http from "../http";
import path from "../path";
export default {
  all() {
    return http.get(path.role);
  },
  add(role: RoleType) {
    return http.post(path.role, role);
  },
  edit(id: number, role: RoleType) {
    return http.put(path.role + "/" + id, role);
  },
  del(id: number) {
    return http.delete(path.role + "/" + id);
  },
};
