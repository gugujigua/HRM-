import axios from "axios";
import router from "../router";
import { ElMessage } from "element-plus";
import type { AxiosRequestHeaders } from "axios";
const intance = axios.create({});
intance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token) {
      (config.headers as AxiosRequestHeaders).token = token;
    } // 在发送请求之前做些什么
    return config;
  },
  function (err) {
    // 对请求错误做些什么
    return Promise.reject(err);
  }
);
intance.interceptors.response.use(
  function (response) {
    if (response.data.code === 401) {
      ElMessage.error(response.data.msg);
      sessionStorage.removeItem("token");
      router.push({ name: "login" });
    }
    if (response.data.code === 404) {
      ElMessage.error(response.data.msg);
    }
    return response;
  },
  function (err) {
    // 对响应错误做点什么
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误(400)";
          break;
        case 401:
          err.message = "未授权，请重新登录(401)";
          break;
        case 403:
          err.message = "拒绝访问(403)";
          break;
        case 404:
          err.message = "请求出错(404)";
          break;
        case 408:
          err.message = "请求超时(408)";
          break;
        case 500:
          err.message = "服务器错误(500)";
          break;
        case 501:
          err.message = "服务未实现(501)";
          break;
        case 502:
          err.message = "网络错误(502)";
          break;
        case 503:
          err.message = "服务不可用(503)";
          break;
        case 504:
          err.message = "网络超时(504)";
          break;
        case 505:
          err.message = "HTTP版本不受支持(505)";
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = "连接服务器失败!";
    }
    ElMessage.error(err.message);
    return Promise.reject(err);
  }
);
export default intance;
