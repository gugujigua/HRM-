import { createStore } from "vuex";
import router, { staticRoutes, activeRoutes } from "@/router";
import api from "@/api";
import type { RouteRecordRaw, RouteMeta } from "vue-router";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      routes: staticRoutes,
      menus: [] as RouteRecordRaw[],
    };
  },
  mutations: {
    setRoutes(state, addRoutes) {
      state.routes[1].children = addRoutes;
      state.menus = addRoutes;
      //   localStorage.routes = addRoutes;
    },
  },
  actions: {
    getMenu(context) {
      return new Promise((resolve) => {
        api.menu.all().then((res) => {
          if (res.data.code === 200) {
            const backAuthData = res.data.data;
            const roleRoutes = getRoleRoutes(activeRoutes, backAuthData);
            console.log(roleRoutes);
            context.commit("setRoutes", roleRoutes);
            for (let k = 0; k < roleRoutes.length; k++) {
              router.addRoute("main", roleRoutes[k]);
              router.options.routes = context.state.routes;
              resolve(context.state.routes);
            }
          }
        });
      });
    },
  },
});
interface AuthDataType {
  id: number;
  role_id: number;
  authority_id: number;
  authority: {
    routeName: string;
  };
  buttons: string;
}
function getRoleRoutes(
  activeRoutes: RouteRecordRaw[],
  backAuthData: AuthDataType[]
) {
  const routes = [];
  for (let i = 0; i < backAuthData.length; i++) {
    for (let j = 0; j < activeRoutes.length; j++) {
      let children: RouteRecordRaw[] = [];
      if (activeRoutes[j].children) {
        children = getRoleRoutes(
          activeRoutes[j].children as RouteRecordRaw[],
          backAuthData
        );
        // activeRoutes[j].children = children;
      }
      if (activeRoutes[j].name === backAuthData[i].authority.routeName) {
        if (children.length > 0) {
          activeRoutes[j].children = children;
        }
        activeRoutes[j].meta = activeRoutes[j].meta ? activeRoutes[j].meta : {};
        (activeRoutes[j].meta as RouteMeta).buttons =
          backAuthData[i].buttons.length > 0
            ? backAuthData[i].buttons.split(",")
            : [];
        routes.push(activeRoutes[j]);
      }
    }
  }
  return routes;
}
export default store;
