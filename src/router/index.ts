import { createRouter, createWebHistory } from 'vue-router'

import TicketListView from '../views/TicketListView.vue'
// import TaskCreateView from '../views/TaskCreateView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: TicketListView
    },
    // {
    //   path: '/create',
    //   component: TicketListView
    // }
  ]
})

export default router