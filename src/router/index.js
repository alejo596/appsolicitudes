import { createRouter, createWebHistory } from '@ionic/vue-router';

//import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
 
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name:'/home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/about/:id',
     name:'/about',
    component: About
  },
  {
    path:'/dashboard',
     name:'/dashboard',
    component:Dashboard

  },
  {
    path: '/login',
    component: Login
  },
   {
    path: '/salir',
    component: Login,

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router



