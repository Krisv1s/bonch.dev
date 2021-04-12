import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:id",
    name: "Profile user",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/user/:id/post/:idPost",
    name: "Post",
    component: () => import("../views/Post.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/Favorite.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
