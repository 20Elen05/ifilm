import { createWebHistory, createRouter } from "vue-router";
import standart  from "@/components/standart.vue";

const routes = [
  {path: "/", component: standart },
  {path: '/movie/:id', component:() => import('../components/movie.vue'), name:'movie'}, 
  {path: '/search/:keyword', component:() => import('../components/search.vue'), name:'search'}, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;