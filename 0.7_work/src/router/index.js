import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/1" },
  {
    path: "/:num",
    name: "Home",
    component: Home,
  },
  {
    path: "/post/:idPost",
    name: "Post",
    component: () => import("../views/Post.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
