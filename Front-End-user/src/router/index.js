import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/CargardesdeAPI",
    name: "CargardesdeAPI",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CargardesdeAPI.vue"),
  },
  {
    path: "/graficos",
    name: "graficos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/graficos.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
