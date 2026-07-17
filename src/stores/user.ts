import { defineStore } from 'pinia'
import { userService } from '../service/user'
import type { User } from '../types/user'

export const useUserStore = defineStore('user', {

  state: () => ({
    users: [] as User[],
    loading: false
  }),

  actions: {

    async fetchUsers() {
      this.loading = true

      try {
        this.users = await userService.getAll()
      } finally {
        this.loading = false
      }
    },

    // async createTask(title: string, description: string) {

    //   const ticket = await ticketService.create({
    //     title,
    //     description
    //   })

    //   this.tasks.push(ticket)
    // }
  }
})