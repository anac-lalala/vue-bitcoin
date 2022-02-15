import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";
import Error from "@/views/Error";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
