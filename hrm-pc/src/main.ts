import { createApp } from "vue";
import "u-reset.css";
import "./assets/css/common.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/fonts/iconfont.css";
import api from "@/api";
const app = createApp(App);
import type { addressType, cityListType } from "./types/common";
import cityData from "./components/SelectCity/cityData.json";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-Box.css";
app.config.globalProperties.api = api;
app.config.globalProperties.$filters = {
  date(val: number, format = "yyyy-MM-dd", timestamp = "ms"): string {
    if (!isNaN(val)) {
      if (timestamp == "ms") {
        val = val * 1;
      } else if (timestamp == "s") {
        val = val * 1000;
      }
    }
    const date = new Date(val);
    if (date.toString() == "Invalid Date") {
      console.error(val + "格式有误，请传入有效的日期格式！");
      return "";
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    interface DateListType {
      [propName: string]: number;
    }
    const o: DateListType = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
    };
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        const str = o[k] + "";
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
        );
      }
    }
    return format;
  },
  address(data: addressType): string {
    const o = {} as addressType;
    let cityList = [] as cityListType[];
    let areaList = [] as cityListType[];
    for (let i = 0; i < cityData.length; i++) {
      if (cityData[i].code === data.province) {
        o.province = cityData[i].name;
        cityList = cityData[i].children as cityListType[];
      }
    }
    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].code === data.city) {
        o.city = cityList[i].name;
        areaList = cityList[i].children as cityListType[];
      }
    }
    for (let i = 0; i < areaList.length; i++) {
      if (areaList[i].code === data.area) {
        o.area = areaList[i].name;
      }
    }
    console.log(o);

    return Object.values(o).join(",");
  },
};
app.use(router);
app.use(store);
app.mount("#app");
