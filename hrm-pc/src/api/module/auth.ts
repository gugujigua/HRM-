import http from "../http";
import path from "../path";
interface AuthData {
  roleId: number;
  authorityId: number;
  buttons: string;
}
export default {
  all() {
    return http.get(path.auth);
  },
  one(id: number) {
    return http.get(path.auth + "/" + id);
  },
  add(data: AuthData[]) {
    return http.post(path.auth, { auth: data });
  },
};
