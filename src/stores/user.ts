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

        this.token = response.accessToken

        localStorage.setItem('token', response.accessToken)
        localStorage.setItem('userId', response.userId)
        localStorage.setItem('username', response.username)
        localStorage.setItem('userEmail', response.email)
        localStorage.setItem('userWhatsapp', response.whatsapp)
    },
    logout() {

        this.token = ''

        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userWhatsapp')
    }
  }
})