import api from '../api/axios'
import type { Ticket } from '../types/ticket'

export const ticketService = {

  async getAll(): Promise<Ticket[]> {
    const response = await api.get('/tickets')

    return response.data
  },

  async getById(id: number): Promise<Ticket> {
    const response = await api.get(`/ticket/${id}`)

    return response.data
  },

  async buy(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    const response = await api.post('/ticket/buy', ticket)

    return response.data
  }
}