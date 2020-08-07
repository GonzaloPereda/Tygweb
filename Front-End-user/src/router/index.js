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
    path: "/guardarstrapi",
    name: "guardarstrapi",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/guardarStrapi.vue"),
  },
  {
    path: "/graficos",
    name: "graficos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/graficos.vue"),
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
