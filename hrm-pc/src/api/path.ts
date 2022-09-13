let baseURL = "";
if (import.meta.env.DEV) {
  baseURL = "http://127.0.0.1:7001/";
}
if (import.meta.env.PROD) {
  baseURL = "http://127.0.0.1:7001/";
}
export default {
  login: baseURL + "v1/login",
  department: baseURL + "v1/department",
  role: baseURL + "v1/role",
  auth: baseURL + "v1/auth",
  post: baseURL + "v1/recruit",
  menu: baseURL + "v1/menu",
};
