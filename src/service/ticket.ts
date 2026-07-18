import api from '../api/axios'
import type { Ticket, TicketList } from '../types/ticket'
import type { BuyTicketMessage }  from '../types/ticket'

export const ticketService = {

  async getAll(): Promise<TicketList[]> {
    const response = await api.get('/ticket/list')

    return response.data
  },

  async getById(id: number): Promise<Ticket> {
    const response = await api.get(`/ticket/${id}`)

    return response.data
  },

  async buy(buyMessage: BuyTicketMessage): Promise<Ticket> {
    const response = await api.post('/ticket/buy', buyMessage)

    return response.data
  }
}