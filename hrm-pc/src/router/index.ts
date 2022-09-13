import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
const staticRoutes = [
  {
    path: "/", //登录
    name: "login",
    component: LoginView,
  },
  {
    path: "/main", // 主页
    name: "main",
    meta: {
      title: "主页",
      visitable: "true",
    },
    component: () => import("../views/MainView.vue"),
    children: [],
    // redirect: { name: "work" },
  },
];
const activeRoutes = [
  {
    path: "work", // 工作台
    name: "work",
    meta: {
      title: "工作台",
      icon: "icon-gongzuotai",
      visitable: "true",
    },
    component: () => import("../views/WorkView.vue"),
  },
  {
    path: "recruit", //招聘
    name: "recruit",
    meta: {
      title: "招聘管理",
      icon: "icon-zhaopin",
      visitable: "true",
    },
    component: () => import("../views/RecruitView.vue"),
    children: [
      {
        path: "post", //岗位
        name: "post",
        meta: {
          title: "招聘岗位",
          icon: "icon-yuanxing",
          visitable: "true",
        },
        component: () => import("../views/PostView.vue"),
      },
      {
        path: "candidate", //候选人
        name: "candidate",
        meta: {
          title: "候选人",
          icon: "icon-yuanxing",
          visitable: "true",
        },
        component: () => import("../views/CandidateView.vue"),
      },
    ],
  },
  {
    path: "staff", //员工管理
    name: "staff",
    meta: {
      title: "员工管理",
      icon: "icon--yuangong",
      visitable: "true",
    },
    component: () => import("../views/StaffView.vue"),
  },
  {
    path: "department", //组织架构
    name: "department",
    meta: {
      title: "组织架构",
      icon: "icon-jurassic_child",
      visitable: "true",
    },
    component: () => import("../views/DepartmentView.vue"),
  },
  {
    path: "system", //系统管理
    name: "system",
    meta: {
      title: "系统管理",
      icon: "icon-xitongguanli",
      visitable: "true",
    },
    component: () => import("../views/SystemView.vue"),
    children: [
      {
        path: "role", //角色
        name: "role",
        meta: {
          title: "角色管理",
          icon: "icon-yuanxing",
          visitable: "true",
        },
        component: () => import("../views/RoleView.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
});
export { staticRoutes, activeRoutes };
//   routes: [
//     {
//       path: "/", //登录
//       name: "login",
//       component: LoginView,
//     },
//     {
//       path: "/main", // 主页
//       name: "main",
//       meta: {
//         title: "主页",
//         visitable: "true",
//       },
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import("../views/MainView.vue"),
//       children: [
//         {
//           path: "work", // 工作台
//           name: "work",
//           meta: {
//             title: "工作台",
//             icon: "icon-gongzuotai",
//             visitable: "true",
//           },
//           component: () => import("../views/WorkView.vue"),
//         },
//         {
//           path: "recruit", //招聘
//           name: "recruit",
//           meta: {
//             title: "招聘管理",
//             icon: "icon-zhaopin",
//             visitable: "true",
//           },
//           component: () => import("../views/RecruitView.vue"),
//           children: [
//             {
//               path: "post", //岗位
//               name: "post",
//               meta: {
//                 title: "招聘岗位",
//                 icon: "icon-yuanxing",
//                 visitable: "true",
//               },
//               component: () => import("../views/PostView.vue"),
//             },
//             {
//               path: "candidate", //候选人
//               name: "candidate",
//               meta: {
//                 title: "候选人",
//                 icon: "icon-yuanxing",
//                 visitable: "true",
//               },
//               component: () => import("../views/CandidateView.vue"),
//             },
//           ],
//         },
//         {
//           path: "staff", //员工管理
//           name: "staff",
//           meta: {
//             title: "员工管理",
//             icon: "icon--yuangong",
//             visitable: "true",
//           },
//           component: () => import("../views/StaffView.vue"),
//         },
//         {
//           path: "department", //组织架构
//           name: "department",
//           meta: {
//             title: "组织架构",
//             icon: "icon-jurassic_child",
//             visitable: "true",
//           },
//           component: () => import("../views/DepartmentView.vue"),
//         },
//         {
//           path: "system", //系统管理
//           name: "system",
//           meta: {
//             title: "系统管理",
//             icon: "icon-xitongguanli",
//             visitable: "true",
//           },
//           component: () => import("../views/SystemView.vue"),
//           children: [
//             {
//               path: "role", //角色
//               name: "role",
//               meta: {
//                 title: "角色管理",
//                 icon: "icon-yuanxing",
//                 visitable: "true",
//               },
//               component: () => import("../views/RoleView.vue"),
//             },
//           ],
//         },
//       ],
//     },
//   ],
// });
router.beforeEach((to, from) => {
  console.log(to);
  console.log(from);
  if (to.path !== "/") {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return "/";
    }
  }
});
export default router;
