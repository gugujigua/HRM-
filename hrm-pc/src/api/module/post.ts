import http from "../http";
import path from "../path";
import type { PostType } from "@/types/recruits";
export default {
  add(data: PostType) {
    return http.post(path.post, data);
  },
  all() {
    return http.get(path.post);
  },
  edit(id: number, data: PostType) {
    return http.put(path.post + "/" + id, data);
  },
  del(id: number) {
    return http.delete(path.post + "/" + id);
  },
};
