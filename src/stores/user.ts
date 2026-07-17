import { defineStore } from 'pinia'
import { userService } from '../service/user'
import type { User } from '../types/user'

export const useUserStore = defineStore('user', {

  state: () => ({
    users: [] as User[],
    loading: false,
    token: localStorage.getItem('token') || ''

  }),
    getters: {

        isAuthenticated: (state) => {
            return !!state.token
        }
    },
  actions: {

    async fetchUsers() {
      this.loading = true

      try {
        this.users = await userService.getAll()
      } finally {
        this.loading = false
      }
    },
    async login(
        email: string,
        password: string
    ) {

        const response = await userService.login({
            email,
            password
        })

        this.token = response.token

        localStorage.setItem(
            'token',
            response.token
        )
    },
    logout() {

        this.token = ''

        localStorage.removeItem('token')
    }
  }
})