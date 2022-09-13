//正常工作
import type api from "@/api";
import type { addressType } from "./common";
import store from "@/store";

export {};
/**注释
 *@param
 *@param
 *@returns
 */
interface filtersType {
  date: (a: number, b?: string, c?: string) => string;
  address: (date: addressType) => string;
}
declare module "vue" {
  interface ComponentCustomProperties {
    $filters: filtersType;
    api: typeof api;
    $store: typeof store;
  }
}
