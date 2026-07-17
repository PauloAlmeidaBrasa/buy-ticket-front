import api from '../api/axios'
import type { User } from '../types/user'
import type { LoginRequest } from '../types/login'  
import type { LoginResponse } from '../types/loginResponse'

export const userService = {

  async getAll(): Promise<User[]> {
    const response = await api.get('/users')

    return response.data
  },

  async getById(id: number): Promise<User> {
    const response = await api.get(`/user/${id}`)

    return response.data
  },

  async create(task: Omit<User, 'id'>): Promise<User> {
    const response = await api.post('auth/login', task)

    return response.data
  },
  async login(payload: LoginRequest): Promise<LoginResponse> {
      const response = await api.post('auth/login',
          payload
      )

      return response.data
  }

  //   async create(task: Omit<User, 'id'>): Promise<User> {
  //   const response = await api.post('auth/login', task)

  //   return response.data
  // }
}