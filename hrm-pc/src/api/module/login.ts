import http from "../http";
import path from "../path";
export default {
  login(data: UserData) {
    return http.post(path.login, data);
  },
  edit(data: ChengeData) {
    return http.put(path.login + "/1", data);
  },
};
