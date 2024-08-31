import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/quotes",
    name: "QuoteList",
    component: () => import("../views/QuoteListView.vue"),
  },
  {
    path: "/new",
    name: "NewQuote",
    component: () => import("../views/NewQuoteView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
