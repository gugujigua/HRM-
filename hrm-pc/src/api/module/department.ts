import type { Department } from "@/types/department";
import http from "../http";
import path from "../path";
export default {
  all() {
    return http.get(path.department);
  },
  add(data: Department) {
    return http.post(path.department, data);
  },
  edit(id: number, data: Department) {
    return http.put(path.department + "/" + id, data);
  },
  del(id: number) {
    return http.delete(path.department + "/" + id);
  },
};
