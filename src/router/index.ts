import { createRouter, createWebHistory } from 'vue-router'

import TicketListView from '../views/tickets/TicketListView.vue'
import LoginView from '../views/LoginView.vue'
// import TaskCreateView from '../views/TaskCreateView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: TicketListView,
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/login',
        component: LoginView
    },
    // {
    //   path: '/create',
    //   component: TicketListView
    // }
  ]
})
router.beforeEach((to) => {

    const token =
        localStorage.getItem('token')

    if (
        to.meta.requiresAuth &&
        !token
    ) {
        return '/login'
    }
})

export default router

