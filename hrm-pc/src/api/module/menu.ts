import http from "../http";
import path from "../path";
export default {
  all() {
    return http.get(path.menu);
  },
};
