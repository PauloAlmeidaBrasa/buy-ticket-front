import api from '../api/axios'
import type { User } from '../types/user'

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
  }
}