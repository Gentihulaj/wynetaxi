import { createRouter, createWebHistory, type RouterScrollBehavior } from "vue-router";

import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Services from "./pages/Services.vue";
import Vehicles from "./pages/Vehicles.vue";
import Contact from "./pages/Contact.vue";
// import NotFound from "./pages/NotFound.vue";

const scrollBehavior: RouterScrollBehavior = async (to, from, savedPosition) => {
  if (savedPosition) return savedPosition;
  if (to.hash) {
    return { el: to.hash, behavior: "smooth" };
  }
  return { top: 0 };
};

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior,
  routes: [
    { path: "/", component: Home },
    { path: "/ueber-uns", component: About },
    { path: "/service", component: Services },
    { path: "/fahrzeuge", component: Vehicles },
    { path: "/kontakt", component: Contact },
    // { path: "/:pathMatch(.*)*", component: NotFound }
  ]
});
